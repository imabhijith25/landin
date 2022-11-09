export const initialState = {
    sidebarOpen: true,
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "TOGGLE_SIDEBAR":
            return { ...state, sidebarOpen: !state.sidebarOpen };
    }
};
