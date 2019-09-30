class Cube {
    constructor() {
        this.data = require('../config/database');
    }

    add(cubeModel) {
        
    }

    create(name, imageUrl, description, difficultyLevel) {
        return { name, imageUrl, description, difficultyLevel };
    }
}

module.exports = new Cube();