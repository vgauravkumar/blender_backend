import bpy
import os
import sys

def changeSize(fileName, scale_factor):
    # Set the path to your GLB model
    glb_path = "./uploads/" + fileName
    # glb_path = "../../uploads/" + fileName

    # Clear existing objects
    bpy.ops.object.select_all(action='DESELECT')
    bpy.ops.object.select_by_type(type='MESH')
    bpy.ops.object.delete()

    # Import the GLB model
    bpy.ops.import_scene.gltf(filepath=glb_path)

    # Set the scale factor you want to apply to the model
    # scale_factor = 3  # Change this to your desired scale

    # Apply scale to each object in the scene
    for obj in bpy.context.scene.objects:
        obj.select_set(True)
        bpy.context.view_layer.objects.active = obj
        bpy.ops.object.transform_apply(scale=True)

    # Scale the scene
    bpy.ops.object.select_all(action='DESELECT')
    bpy.ops.object.select_by_type(type='MESH')
    bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='BOUNDS')
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.transform.resize(value=(scale_factor, scale_factor, scale_factor))

    # Save the modified model
    output_path = os.path.splitext(glb_path)[0] + ".glb"
    bpy.ops.export_scene.gltf(filepath=output_path, export_format='GLB')

    print("Model resized and saved to:", output_path)

if __name__ == "__main__":
    print(sys.argv)
    if len(sys.argv) != 6:
        print("Usage: blender --background --python changeSize.py -- <fileName> <scale_factor>")
    else:
        param1 = sys.argv[4]
        param2 = float(sys.argv[5])
        changeSize(param1, param2)
