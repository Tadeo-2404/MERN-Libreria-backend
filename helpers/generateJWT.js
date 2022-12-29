import jsonwebtoken from 'jsonwebtoken';

const generateJWT = (id) => {
    return jsonwebtoken.sign({id: id}, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })
}

export default generateJWT;