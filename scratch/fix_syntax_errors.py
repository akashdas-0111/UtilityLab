import os
import re

def fix_template_literals(directory):
    count = 0
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Replace \${ with ${
                new_content = content.replace('\\${', '${')
                
                if new_content != content:
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Fixed: {path}")
                    count += 1
    print(f"Total files fixed: {count}")

if __name__ == "__main__":
    fix_template_literals('c:/Users/akash/OneDrive/Desktop/UtilityLab/src/app')
