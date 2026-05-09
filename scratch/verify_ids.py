import os
import re

def verify_tool_ids(src_dir, tools_file):
    # Get all valid IDs from tools.ts
    with open(tools_file, 'r', encoding='utf-8') as f:
        tools_content = f.read()
    
    valid_ids = re.findall(r'id:\s*"([^"]+)"', tools_content)
    print(f"Valid IDs in registry: {len(valid_ids)}")
    
    # Scan for tools.find(t => t.id === "...")
    id_pattern = re.compile(r'tools\.find\(.*?id\s*===\s*"([^"]+)"\)')
    
    mismatches = []
    
    for root, dirs, files in os.walk(src_dir):
        for file in files:
            if file.endswith('.tsx'):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                matches = id_pattern.findall(content)
                for found_id in matches:
                    if found_id not in valid_ids:
                        mismatches.append((path, found_id))
    
    if mismatches:
        print("\n!!! Found ID Mismatches !!!")
        for path, found_id in mismatches:
            print(f"File: {path} | Unknown ID: {found_id}")
    else:
        print("\nAll tool IDs verified successfully.")

if __name__ == "__main__":
    verify_tool_ids('c:/Users/akash/OneDrive/Desktop/UtilityLab/src/app', 'c:/Users/akash/OneDrive/Desktop/UtilityLab/src/lib/tools.ts')
