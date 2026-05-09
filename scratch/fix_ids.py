import os

mismatches = {
    "user-agent-parser": "ua-parser",
    "hash-generator": "hash",
    "qr-code-generator": "qr-code",
    "regex-generator": "regex",
    "sql-generator": "sql",
    "uuid-generator": "uuid",
    "random-text-generator": "random-text-gen",
    "remove-duplicate-lines": "remove-duplicates",
    "password-gen": "password-generator" # Already fixed but good to have
}

def fix_mismatched_ids(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx'):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                new_content = content
                for old_id, new_id in mismatches.items():
                    # Look for tools.find(t => t.id === "OLD_ID")
                    target = f'id === "{old_id}"'
                    replacement = f'id === "{new_id}"'
                    new_content = new_content.replace(target, replacement)
                
                if new_content != content:
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Fixed ID in: {path}")

if __name__ == "__main__":
    fix_mismatched_ids('c:/Users/akash/OneDrive/Desktop/UtilityLab/src/app')
