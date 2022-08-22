import jwt from 'jsonwebtoken'

const generarJWT = (id) => {
    // sing genera de forma sincrona un jason web token
    return jwt.sign( { id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    })
}

export default generarJWT;