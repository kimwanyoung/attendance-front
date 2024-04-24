const textConverter = (text: string) => {
    if(text.length > 9) {
        return text.slice(0, 9) + "...";
    }
    return text;
}

export {textConverter};