export const slideFromBottom = () => {
  return {
    gestureEnabled: true,
    cardStyleInterpolator: ({current, next, layouts}: any) => {
      return {
        cardStyle: {
          transform: [
            {
              translateY: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
          ],
        },
      };
    },
  };
};

export const zoomInZoomOut = () => {
  return {
    gestureEnabled: true,
    cardStyleInterpolator: ({current, next, layouts}: any) => {
      return {
        cardStyle: {
          transform: [
            {
              scale: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0.5, 1],
              }),
            },
          ],
        },
      };
    },
  };
};

export const slideFromLeft = () => {
  return {
    gestureEnabled: true,
    cardStyleInterpolator: ({current, next, layouts}: any) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
          ],
        },
      };
    },
  };
};

export const slideFromRight = () => {
  return {
    gestureEnabled: true,
    cardStyleInterpolator: ({current, next, layouts}: any) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [-layouts.screen.width, 0],
              }),
            },
          ],
        },
      };
    },
  };
};

export const fadeInFadeOut = () => {
  return {
    gestureEnabled: true,
    cardStyleInterpolator: ({current, next, layouts}: any) => {
      return {
        cardStyle: {
          opacity: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
        },
      };
    },
  };
};
