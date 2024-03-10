import subprocess
import os

def convert_fbx_to_glb(input_file, output_file):
    """
    Convert FBX file to GLB using fbx2gltf command-line tool.
    
    Args:
        input_file (str): Path to the input FBX file.
        output_file (str): Path to save the output GLB file.
    """
    # Ensure the input file exists
    if not os.path.exists(input_file):
        print("Error: Input file not found.")
        return
    
    # Run fbx2gltf command
    try:
        subprocess.run(["fbx2gltf", input_file, output_file])
        print("Conversion successful!")
    except Exception as e:
        print("Error:", e)

if __name__ == "__main__":
    # Replace these paths with your actual input and output file paths
    input_fbx_file = "cone.fbx"
    output_glb_file = "cone.glb"

    convert_fbx_to_glb(input_fbx_file, output_glb_file)
