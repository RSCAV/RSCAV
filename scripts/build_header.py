"""Draw the profile header: "Keep moving." over water shaped by the last 12 months of contributions.

Calm water on idle weeks, swells on busy ones; a shark swims under it and only the fin breaks the
surface. Runs daily from .github/workflows/header.yml. On any API failure it keeps the last files.
"""
import json, math, os, pathlib, sys, urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
LOGIN = os.environ.get("PROFILE_LOGIN", "RSCAV")
W, H, WL, S = 1200, 250, 168, 0.7
TEXT = (ROOT / "scripts" / "keep-moving-path.txt").read_text().strip()
THEMES = {"light": ("#1f2328", "#d1d9e0"), "dark": ("#f0f6fc", "#3d444d")}
BODY = ("M 300,2 C 290,-14 255,-22 224,-22 L 218,-22 C 210,-58 190,-98 152,-114 C 166,-82 160,-44 138,-20 "
        "C 120,-18 80,-12 40,-6 L 40,6 C 80,12 120,20 175,20 L 198,20 C 186,36 170,50 150,58 "
        "C 168,44 182,30 186,21 C 240,22 285,14 300,2 Z")
TAIL = "M 44,-6 C 28,-20 14,-38 -2,-50 C 6,-30 9,-14 22,0 C 8,12 0,24 -4,34 C 12,22 26,10 44,6 Z"


def contributions():
    query = '{ user(login:"%s"){ contributionsCollection { contributionCalendar { weeks { contributionDays { contributionCount } } } } } }' % LOGIN
    req = urllib.request.Request("https://api.github.com/graphql", data=json.dumps({"query": query}).encode(),
                                 headers={"Authorization": f"bearer {os.environ['GITHUB_TOKEN']}", "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=30) as r:
        cal = json.load(r)["data"]["user"]["contributionsCollection"]["contributionCalendar"]
    return [d["contributionCount"] for w in cal["weeks"] for d in w["contributionDays"]]


def svg(counts, fg, line):
    week = [sum(counts[max(0, i - 6):i + 1]) / len(counts[max(0, i - 6):i + 1]) for i in range(len(counts))]
    peak = max(week) or 1

    def amp(x):
        return 5.0 * math.sqrt(week[min(len(week) - 1, int(x / W * (len(week) - 1)))] / peak)

    pts = [(x, WL - amp(x) * math.sin(2 * math.pi * x / 64)) for x in range(0, W + 1, 2)]
    surface = "M " + " L ".join(f"{x},{y:.2f}" for x, y in pts)
    above = surface + f" L {W + 400},{WL} L {W + 400},0 L -400,0 L -400,{WL} Z"
    below = surface + f" L {W + 400},{WL} L {W + 400},{H} L -400,{H} L -400,{WL} Z"
    shark = (f'<g transform="translate(0,{WL + 42}) scale({S})"><path d="{BODY}"/>'
             f'<path d="{TAIL}"><animateTransform attributeName="transform" type="rotate" '
             'values="-7 42 0;7 42 0;-7 42 0" dur="1.6s" repeatCount="indefinite"/></path></g>')
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" aria-label="Keep moving.">\n'
            "<style>.swim{animation:swim 30s linear -13s infinite}"
            "@keyframes swim{from{transform:translateX(-260px)}to{transform:translateX(1340px)}}"
            ".bob{animation:bob 2.8s ease-in-out infinite alternate}"
            "@keyframes bob{from{transform:translateY(2px)}to{transform:translateY(-2px)}}"
            "@media (prefers-reduced-motion: reduce){*{animation:none!important}}</style>\n"
            f'<defs><clipPath id="above"><path d="{above}"/></clipPath><clipPath id="below"><path d="{below}"/></clipPath></defs>\n'
            f'<path d="{TEXT}" transform="translate(0,92)" fill="{fg}"/>\n'
            f'<path d="{surface}" fill="none" stroke="{line}" stroke-width="2" stroke-linejoin="round"/>\n'
            f'<g class="swim"><g class="bob"><g clip-path="url(#below)" fill="{fg}" opacity=".07">{shark}</g>'
            f'<g clip-path="url(#above)" fill="{fg}">{shark}</g></g></g>\n</svg>\n')


def main():
    try:
        counts = contributions()
    except Exception as e:  # keep yesterday's water rather than break the profile
        print(f"contributions unavailable, keeping current header: {e}", file=sys.stderr)
        return
    for theme, (fg, line) in THEMES.items():
        (ROOT / "assets" / f"keep-moving-{theme}.svg").write_text(svg(counts, fg, line))
    print(f"header redrawn from {len(counts)} days")


if __name__ == "__main__":
    main()
