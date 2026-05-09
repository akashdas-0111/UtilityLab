import os
import re

# Get current directory
base_path = r"c:\Users\akash\OneDrive\Desktop\UtilityLab"
src_app = os.path.join(base_path, "src", "app")
tools_file = os.path.join(base_path, "src", "lib", "tools.ts")

# 1. Get all page.tsx paths (relative to src/app)
implemented_pages = set()
for root, dirs, files in os.walk(src_app):
    if "page.tsx" in files:
        rel_path = os.path.relpath(root, src_app)
        if rel_path == ".":
            implemented_pages.add("/")
        else:
            implemented_pages.add("/" + rel_path.replace(os.sep, "/"))

# 2. Parse tools.ts for registered paths
with open(tools_file, 'r') as f:
    content = f.read()

# Match path: "/..."
registered_paths = re.findall(r'path:\s*"([^"]+)"', content)

# 3. Check for 404s (Registered but not implemented)
missing_implementations = []
for path in registered_paths:
    if path not in implemented_pages:
        missing_implementations.append(path)

# 4. Check for unmapped pages (Implemented but not registered - optional but good)
unmapped_pages = []
core_pages = ["/", "/about", "/contact", "/privacy", "/search"]
for page in implemented_pages:
    if page not in registered_paths and page not in core_pages and not page.endswith("]"):
        unmapped_pages.append(page)

print("--- MAPPING VERIFICATION ---")
if not missing_implementations:
    print("[SUCCESS] All registered tools have corresponding page.tsx files.")
else:
    print("[ERROR] The following paths are registered in tools.ts but have NO implementation (404 risk):")
    for p in missing_implementations:
        print(f"  - {p}")

if unmapped_pages:
    print("\n[NOTE] The following pages exist but are not registered in tools.ts:")
    for p in unmapped_pages:
        print(f"  - {p}")
