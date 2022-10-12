

const themeDictionary = {
    "tokyo": {

        "night": {
            "--profileBackground": "#001220",
            "--overallBackground": "#25232D",

        },

        "winter": {
            "--profileBackground": "#001220",
            "--overallBackground": "#0B242F"
        },
        "love": {
            "--profileBackground": "#001220",
            "--overallBackground": "#0B202F"
        }
    }



}
 const themeBackground = {
    "tokyo": {

        "night": {
            "location": "./images/Tokyo/night.svg"
        },

        "winter": {
            "location": "./images/Tokyo/winter.svg"
        },
        "love": {
            "location": "./images/Tokyo/love.svg"

        }
    }

}

export const getThemeVariables = (themeName) => {
    const splittedThemeName = themeName?.split("_")
    return themeDictionary[splittedThemeName[0]][splittedThemeName[1]]

}

export const getThemeBackground = (themeName) => {
    const splittedThemeName = themeName?.split("_")
    return themeBackground[splittedThemeName[0]][splittedThemeName[1]]
}