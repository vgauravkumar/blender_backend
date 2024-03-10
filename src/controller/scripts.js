const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

const createCube = async (req, res) => {
    try {
        // Execute Python script
        const { stdout, stderr } = await execAsync('blender --background --python ./src/controller/createCube.py');
        // Print any output from the script
        console.log(`Python script output: ${stdout}`);
        if(stderr)
          console.log(`Python script error: ${stderr}`);
        // Respond with success message
        res.status(200).json({
          success: true,
          message: 'Python script executed successfully',
        });
    } catch (error) {
        console.error(`Error executing Python script: ${error}`);
        res.status(500).send('Internal Server Error');
    }
};

const changeSize = async (req, res) => {
  try {
      const { fileName, size } = req.body;
      // Execute Python script
      const { stdout, stderr } = await execAsync(`blender --background --python ./src/controller/changeSize.py ${fileName} ${size}`);
      // Print any output from the script
      console.log(`Python script output: ${stdout}`);
      console.log(`Python script error: ${stderr}`);
      if(stderr)
        console.log(`Python script error: ${stderr}`);
      // Respond with success message
      res.status(200).json({
        success: true,
        message: 'Python script executed successfully',
      });
  } catch (error) {
      console.error(`Error executing Python script: ${error.stack}`);
      res.status(200).json({
        success: true,
        message: 'Something went wrong',
      });
  }
};

const changePosition = async (req, res) => {
  try {
      const { fileName, position } = req.body;
      // Execute Python script
      const { stdout, stderr } = await execAsync(`blender --background --python ./src/controller/changePosition.py ${fileName} ${position}`);
      // Print any output from the script
      console.log(`Python script output: ${stdout}`);
      console.log(`Python script error: ${stderr}`);
      if(stderr)
        console.log(`Python script error: ${stderr}`);
      // Respond with success message
      res.status(200).json({
        success: true,
        message: 'Python script executed successfully',
      });
  } catch (error) {
      console.error(`Error executing Python script: ${error.stack}`);
      res.status(200).json({
        success: true,
        message: 'Something went wrong',
      });
  }
};

module.exports = {
  createCube,
  changeSize,
  changePosition
}