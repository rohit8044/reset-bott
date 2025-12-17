import os
import json
import requests
from datetime import datetime
from telegram import Update, Bot
from telegram.ext import (
    Application,
    CommandHandler,
    MessageHandler,
    ContextTypes,
    filters,
)

# -------- ENV --------
BOT_TOKEN = os.getenv("8366938124:AAGMffmDBP0mDCY9mMAiqPW2hO1BN8ay8cU")
API_URL = os.getenv("https://hgcheats.online/api/reset.php")
API_KEY = os.getenv("1913cf496729584b6e73352ab8264dd96d98829cd36c1d88cb3f271e667ae6e5")
ADMINS = {int(x) for x in os.getenv("7863828337", "").split(",") if x}

MAX_RESETS = 10
usage = {}  # ⚠️ demo only (Vercel is stateless)

# -------- MESSAGES --------
def success_msg(user, msg, admin, used):
    t = datetime.now().strftime("%I:%M:%S %p")
    limit = "Unlimited" if admin else f"{used}/{MAX_RESETS}"
    return (
        "✅ *RESET DONE*\n\n"
        f"👤 `{user}`\n"
        f"⏰ {t}\n"
        f"📩 {msg}\n"
        f"📊 {limit}"
    )

# -------- API --------
def reset_api(username):
    try:
        r = requests.post(
            API_URL,
            json={"username": username},
            headers={"X-API-Key": API_KEY},
            timeout=10,
        )
        return r.json()
    except Exception as e:
        return {"message": str(e)}

# -------- HANDLERS --------
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("🤖 Bot active (Webhook mode)")

async def status(update: Update, context: ContextTypes.DEFAULT_TYPE):
    uid = update.effective_user.id
    used = usage.get(uid, 0)
    admin = uid in ADMINS
    await update.message.reply_text(
        f"📊 Usage: {'Unlimited' if admin else f'{used}/{MAX_RESETS}'}"
    )

async def handle(update: Update, context: ContextTypes.DEFAULT_TYPE):
    uid = update.effective_user.id
    username = update.message.text.strip()

    if len(username) < 3 or " " in username:
        return

    admin = uid in ADMINS
    if not admin:
        used = usage.get(uid, 0)
        if used >= MAX_RESETS:
            await update.message.reply_text("⛔ Limit reached")
            return
        usage[uid] = used + 1

    data = reset_api(username)
    await update.message.reply_text(
        success_msg(username, data.get("message"), admin, usage.get(uid, 0)),
        parse_mode="Markdown",
    )

# -------- APP --------
bot = Bot(BOT_TOKEN)
app = Application.builder().bot(bot).build()

app.add_handler(CommandHandler("start", start))
app.add_handler(CommandHandler("status", status))
app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle))

# -------- VERCEL ENTRY --------
async def handler(request):
    if request.method != "POST":
        return {"statusCode": 200, "body": "OK"}

    update = Update.de_json(json.loads(request.body), bot)

    await app.initialize()
    await app.process_update(update)
    await app.shutdown()

    return {"statusCode": 200, "body": "OK"}
