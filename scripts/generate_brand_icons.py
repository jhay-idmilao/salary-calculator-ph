from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
FONT = Path("C:/Windows/Fonts/arialbd.ttf")


def mark(size: int, *, maskable: bool = False) -> Image.Image:
    scale = 4
    canvas_size = size * scale
    image = Image.new("RGBA", (canvas_size, canvas_size), "#f8f9ff" if maskable else (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)
    inset = int(canvas_size * (0.18 if maskable else 0.06))
    radius = int(canvas_size * 0.22)
    draw.rounded_rectangle(
        (inset, inset, canvas_size - inset, canvas_size - inset),
        radius=radius,
        fill="#0b57d0",
    )
    font = ImageFont.truetype(str(FONT), int(canvas_size * (0.50 if maskable else 0.57)))
    draw.text(
        (canvas_size / 2, canvas_size / 2 + canvas_size * 0.035),
        "₱",
        font=font,
        fill="white",
        anchor="mm",
        stroke_width=0,
    )
    return image.resize((size, size), Image.Resampling.LANCZOS)


PUBLIC.mkdir(exist_ok=True)
mark(180, maskable=True).convert("RGB").save(PUBLIC / "apple-touch-icon.png", optimize=True)
mark(192, maskable=True).save(PUBLIC / "android-chrome-192x192.png", optimize=True)
mark(512, maskable=True).save(PUBLIC / "android-chrome-512x512.png", optimize=True)
mark(512, maskable=True).save(PUBLIC / "maskable-icon-512x512.png", optimize=True)

ico_frames = [mark(size) for size in (16, 32, 48)]
ico_frames[0].save(
    PUBLIC / "favicon.ico",
    format="ICO",
    sizes=[(16, 16), (32, 32), (48, 48)],
    append_images=ico_frames[1:],
)
