#!/usr/bin/env python3
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA_FILE = ROOT / "docs" / "data.json"
REQUIRED_FIELDS = {
    "title",
    "date",
    "type",
    "source",
    "url",
    "region",
    "keywords",
    "topics",
    "summary",
    "businessRelation",
}


def main() -> int:
    data = json.loads(DATA_FILE.read_text(encoding="utf-8"))
    items = data.get("items", [])
    if not isinstance(items, list):
        raise SystemExit("docs/data.json: items must be a list")

    urls = set()
    warnings = []

    for index, item in enumerate(items, start=1):
        missing = sorted(field for field in REQUIRED_FIELDS if field not in item)
        if missing:
            warnings.append(f"item {index}: missing fields: {', '.join(missing)}")

        url = item.get("url")
        if url:
            if url in urls:
                warnings.append(f"item {index}: duplicate url: {url}")
            urls.add(url)
        else:
            warnings.append(f"item {index}: missing url")

    print(f"items: {len(items)}")
    if warnings:
        print("warnings:")
        for warning in warnings:
            print(f"- {warning}")
    else:
        print("ok")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())

