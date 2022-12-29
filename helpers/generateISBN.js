import randomstring from "randomstring";

const generateISBN = () => {
    return randomstring.generate(10);
}

export default generateISBN;