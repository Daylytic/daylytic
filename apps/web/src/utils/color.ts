export const invertColor = (red: number, green: number, blue: number): string => {
    const brightness = red * 0.299 + green * 0.587 + blue * 0.114;
    return brightness > 186 ? '#000000' : '#ffffff';
};

export const invertColorFromHex = (hex: string): string => {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) {
        hex = hex.split('').map(ch => ch + ch).join('');
    }

    const red = parseInt(hex.substring(0, 2), 16);
    const green = parseInt(hex.substring(2, 4), 16);
    const blue = parseInt(hex.substring(4, 6), 16);

    const brightness = red * 0.299 + green * 0.587 + blue * 0.114;
    return brightness > 186 ? '#000000' : '#ffffff';
};

export const adjustColor = (hex: string): string => {
    hex = hex.replace(/^#/, '');

    if (hex.length === 3) {
        hex = hex.split('').map(ch => ch + ch).join('');
    }

    // Parse the r, g, b values
    const red = parseInt(hex.substring(0, 2), 16);
    const green = parseInt(hex.substring(2, 4), 16);
    const blue = parseInt(hex.substring(4, 6), 16);

    const brightness = red * 0.299 + green * 0.587 + blue * 0.114;

    const HIGH_THRESHOLD = 240;
    const LOW_THRESHOLD = 10;

    if (brightness >= HIGH_THRESHOLD) {
        return '#000000';
    }

    if (brightness <= LOW_THRESHOLD) {
        return '#ffffff';
    }

    return `#${hex}`;
};

export const generatePresets = (presets = presetPalettes) => {
  return Object.entries(presets).map<Presets>(([label, colors]) => ({
    label,
    colors,
    key: label,
  }));
};

export const pallets = {
  General: [
    "#eb2f96",
    "#f5222d",
    "#fa541c",
    "#fa8c16",
    "#faad14",
    "#a0d911",
    "#52c41a",
    "#13c2c2",
    "#1677ff",
    "#2f54eb",
    "#722ed1",
  ],
};