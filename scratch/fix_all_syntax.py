import os
import re

def fix_all_escaping_issues(directory):
    count = 0
    # Pattern to find escaped backticks inside template literals or anywhere they shouldn't be
    # Often it looks like \` or \${
    # We want to replace \` with ` and \${ with ${
    
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Fix both \${ and \`
                new_content = content.replace('\\${', '${').replace('\\`', '`')
                
                if new_content != content:
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Fixed: {path}")
                    count += 1
    print(f"Total files fixed in second pass: {count}")

if __name__ == "__main__":
    fix_all_escaping_issues('c:/Users/akash/OneDrive/Desktop/UtilityLab/src/app')
