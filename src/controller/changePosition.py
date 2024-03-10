import bpy
import os
import sys

def changeSizeAndPosition(fileName, position_offset):
    # Set the path to your GLB model
    glb_path = "./uploads/" + fileName
    # glb_path = "../../uploads/" + fileName

    # Clear existing objects
    bpy.ops.object.select_all(action='DESELECT')
    bpy.ops.object.select_by_type(type='MESH')
    bpy.ops.object.delete()

    # Import the GLB model
    bpy.ops.import_scene.gltf(filepath=glb_path)

    # Apply scale to each object in the scene
    for obj in bpy.context.scene.objects:
        obj.select_set(True)
        bpy.context.view_layer.objects.active = obj
        bpy.ops.object.transform_apply(scale=True)

    # Apply position offset to the scene
    bpy.ops.object.select_all(action='DESELECT')
    bpy.ops.object.select_by_type(type='MESH')
    bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='BOUNDS')
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.transform.translate(value=position_offset)

    # Save the modified model
    output_path = os.path.splitext(glb_path)[0] + "_modified.glb"
    bpy.ops.export_scene.gltf(filepath=output_path, export_format='GLB')

    print("Model resized and positioned, saved to:", output_path)

if __name__ == "__main__":
    print(sys.argv)
    if len(sys.argv) != 8:
        print("Usage: blender --background --python changePosition.py -- <fileName> <position_offset_x>")
    else:
        param1 = sys.argv[4]
        param2 = (float(sys.argv[5]), float(sys.argv[5]), float(sys.argv[5]))
        changePosition(param1, param2)
