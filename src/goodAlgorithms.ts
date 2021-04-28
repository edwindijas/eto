export const shuffle = (array: any[]): any[] => {

    let currentIndex = array.length - 1;

    while(currentIndex !== 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        const tmp = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = tmp;
        currentIndex -= 1;
    }

    return array;
}

export const ucFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.substr(1);
}