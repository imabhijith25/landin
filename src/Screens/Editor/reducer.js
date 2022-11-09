export const initialState = {
    sidebarOpen: true,
    widgetModal: false,
    currentSelected: "background",
    preview: {
        background: {
            type: "gradient", //gradient, image,, plain
            name: "blackBell", //name
        },
        profile: {
            profilePic:
                "https://images.unsplash.com/photo-1568572933382-74d440642117?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
            name: "Avinash",
            bio: "Short bio about what I don and what not",
            social: {
                twitter: "twitter",
                instagram: "instagram",
            },
        },
    },
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "TOGGLE_SIDEBAR":
            return { ...state, sidebarOpen: !state.sidebarOpen };

        case "TOGGLE_MODAL_WIDGET":
            return { ...state, widgetModal: !state.widgetModal };

        case "SET_CURRENT_SELECTED":
            return { ...state, currentSelected: action.data };

        case "CHANGE_BACKGROUND":
            console.log(action);
            return {
                ...state,
                preview: {
                    ...state.preview,
                    background: {
                        type: action.data?.type,
                        name: action?.data?.name,
                    },
                },
            };
    }
};
