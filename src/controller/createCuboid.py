import bpy
import sys
import os

def delete_all_mesh_objects():
    # Get all mesh objects in the scene and delete them
    bpy.ops.object.select_all(action='DESELECT')
    bpy.ops.object.select_by_type(type='MESH')
    bpy.ops.object.delete()

def create_cuboid(size_x, size_y, size_z, success_message):
    # Delete existing mesh objects
    delete_all_mesh_objects()
    
    # Create a new mesh object (a cuboid)
    bpy.ops.mesh.primitive_cube_add(size=size_x)
    cuboid_obj = bpy.context.active_object

    # Set the scale of the cuboid
    cuboid_obj.scale = (size_x, size_y, size_z)

    # Define the file path for saving the glb file
    output_path = os.path.join(os.getcwd(), "cuboid.glb")

    # Export the cuboid object as a glb file
    bpy.ops.export_scene.gltf(
        filepath=output_path,
        export_format='GLB',
        export_apply=True
    )

    print("GLB file exported successfully!", success_message)

if __name__ == "__main__":
    if len(sys.argv) != 9:
        print("Usage: blender --background --python createCuboid.py -- <size_x> <size_y> <size_z> <success_message>")
    else:
        size_x = float(sys.argv[5])
        size_y = float(sys.argv[6])
        size_z = float(sys.argv[7])
        success_message = sys.argv[8]
        create_cuboid(size_x, size_y, size_z, success_message)
