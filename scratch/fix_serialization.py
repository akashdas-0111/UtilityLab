import os
import re

def fix_category_pages(directory):
    # Mapping of category keys to their actual category names in tools.ts
    mapping = {
        "generators": "Generators",
        "calculators": "Calculators",
        "converters": "Converters",
        "math-tools": "Math",
        "text-tools": "Text",
        "seo-tools": "SEO",
        "networking-tools": "Networking",
        "image-tools": "Image",
        "developer-tools": "Developer",
        "validators": "Validators"
    }
    
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file == 'page.tsx':
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                if 'CategoryList' in content and 'filter={' in content:
                    # Extract the categoryKey value
                    match = re.search(r'categoryKey="([^"]+)"', content)
                    if match:
                        cat_key = match.group(1)
                        if cat_key in mapping:
                            cat_name = mapping[cat_key]
                            # Replace filter with categoryName
                            new_content = re.sub(r'filter=\{\(t\) => t\.category === "[^"]+"\}', f'categoryName="{cat_name}"', content)
                            # Handle the generic filter if any
                            new_content = re.sub(r'filter=\{\(t\) => t\.category === [^}]+\}', f'categoryName="{cat_name}"', new_content)
                            # Fallback for the complex filter in validators
                            new_content = new_content.replace('filter={(t) => t.category === "Validators" || t.name.toLowerCase().includes("validator") || t.name.toLowerCase().includes("checker")}', f'categoryName="Validators"')
                            
                            if new_content != content:
                                with open(path, 'w', encoding='utf-8') as f:
                                    f.write(new_content)
                                print(f"Fixed serialization in: {path}")

if __name__ == "__main__":
    fix_category_pages('c:/Users/akash/OneDrive/Desktop/UtilityLab/src/app')
