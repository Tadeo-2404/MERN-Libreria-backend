import randomstring from "randomstring";

const generateToken = () => {
    return randomstring.generate();
}

export default generateToken;