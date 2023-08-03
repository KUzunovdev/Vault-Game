type Config = {
  assets: {
    positions: {
      vault: {
        x: number;
        y: number;
      };
      handle: {
        x: number;
        y: number;
      };
    };
  };
  rotation: {
    step: number;
  };
  combination: {
    length: number;
  };
};

export default {
  assets: {
    positions: {
      vault: {
        x: 30,
        y: 10,
      },
      handle: {
        x: 0.5,
        y: 0.5,
      },
    },
  },
  rotation: {
    step: 9,
  },
  combination: {
    length: 3,
  },
} as Config;
