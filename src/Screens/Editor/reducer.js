export const initialState = {
    sidebarOpen: true,
    widgetModal: false,
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "TOGGLE_SIDEBAR":
            return { ...state, sidebarOpen: !state.sidebarOpen };

        case "TOGGLE_MODAL_WIDGET":
            return { ...state, widgetModal: !state.widgetModal };
    }
};
