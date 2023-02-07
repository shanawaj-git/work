module.exports = {
    getLogger: () => ({
        info: jest.fn(),
        warn: jest.fn(),
        log: jest.fn(),
        error: jest.fn(),
        debug: jest.fn(),
    })
};
