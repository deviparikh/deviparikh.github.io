This the patches dataset used in the following paper. If you use this dataset, please cite this paper.

C. Lawrence Zitnick and Devi Parikh
The Role of Image Understanding in Contour Detection
IEEE Conference on Computer Vision and Pattern Recognition (CVPR), 2012

Bibtex:

@InProceedings{ZitnickParikhCVPR2012,
  author    = {C. Lawrence Zitnick and Devi Parikh},
  title     = {The Role of Image Understanding in Contour Detection},
  booktitle = {IEEE Conference on Computer Vision and Pattern Recognition (CVPR)},
  year      = {2012}
}

The patches folder contains all the patches in our dataset.

The patches.mat file contains:

im_names: the names of the patch files (found in patches folder)

patch_size: the size of the patch in pixels (7x7, 9x9, 15x15, 25x25, 33x33, 63x63, 127x127)

boundary_presence: 1 if the corresponding patch has a boundary going through the center of the patch, 0 otherwise.

amount_of_gradient: 1: low, 2: medium, 3: high

transformation_names: the 7 tranfsormations we experimented with in our paper: color (regular RGB patch), color_ud (upside down RGB patch), gray (grayscale patch), gray_ud (upside down grayscale patch), rot_color_ud (upside down RGB patch with the color channels rotated), rot_inv_color_ud (upside down RGB patch with the color channels rotated and inverted), rot_1inv_color_ud (upside down RGB patches with color channels rotated and one of the color channels inverted). See paper for details.

transformation: the transformation ID (1 through 7) used to generate the patch.