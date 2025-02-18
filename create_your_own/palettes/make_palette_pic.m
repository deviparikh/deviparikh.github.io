clear all; close all; clc

% colors = [
%         [241, 157, 64],
%         [212, 54, 57],
%         [34, 88, 151],
%         [97, 194, 182],
%         [253, 255, 252]
%     ];
%
% for i=1:size(colors,1)
%    im{1,i} = uint8(zeros(50,50,3));
%    for m=1:3
%       im{1,i}(:,:,m) = colors(i,m);
%    end
% end
% imwrite(cell2mat(im),'./palettes/palette_6.png')

% colors{1} = [255, 255, 255];
% colors{2} = [246, 244, 240];
% colors{3} = [244, 239, 220];
% colors{4} = [30, 27, 39];
% colors{5} = [0, 0, 0];
%
% for i=1:length(colors)
%    im{1} = uint8(zeros(50,50,3));
%    for m=1:3
%       im{1}(:,:,m) = colors{i}(m);
%    end
%        im{1}(1,:,:)=0;
%        im{1}(:,1,:)=0;
%        im{1}(end,:,:)=0;
%        im{1}(:,end,:)=0;
%    imwrite(cell2mat(im),['./ecolor_' num2str(i-1) '.png'])
% end


all_colors{1} = [{'#da0424'},{'#04da9b'},{'#f9eaa1'},{'#080c9a'},{'#040404'}];
all_colors{2} = [{'#e52547'},{'#08413f'},{'#5083bc'},{'#f2e8d2'},{'#41aba7'}];
all_colors{3} = [{'#fc8c54'},{'#fa6324'},{'#050505'},{'#eee9e9'},{'#ea30ac'}];
all_colors{4} = [{'#fb0574'},{'#f7e40d'},{'#330cd4'},{'#fbfbfb'},{'#9e90dc'}];
all_colors{5} = [{'#f08906'},{'#05ac9c'},{'#055ca3'},{'#f7f5c2'},{'#ab1344'}];
all_colors{6} = [{'#048bd3'},{'#05649c'},{'#100e14'},{'#f7f19f'},{'#70cb3b'}];


for pid=1:length(all_colors)
    for i=1:length(all_colors{pid})
        dummy = all_colors{pid}{i};
        dummy(1)=[];
        colors(i,1) = hex2dec(dummy(1:2));
        colors(i,2) = hex2dec(dummy(3:4));
        colors(i,3) = hex2dec(dummy(5:6));
    end
    for i=1:size(colors,1)
        im{1,i} = uint8(zeros(50,50,3));
        for m=1:3
            im{1,i}(:,:,m) = colors(i,m);
        end
    end
    imwrite(cell2mat(im),['./palette_' num2str(pid+6) '.png'])
    clear im
    clear colors
end