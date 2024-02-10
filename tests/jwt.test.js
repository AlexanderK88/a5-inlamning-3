import { login, loginVerify } from '../src/auth'
import jwt from 'jsonwebtoken'
import { jest } from '@jest/globals';

const originalJwtSign = jwt.sign

describe('login', () => {
    let mockRequest
    let mockResponse

    beforeEach(() => {
        mockRequest = {
            body: {username: 'testUser'}
        }
        mockResponse = {
            cookie: jest.fn(),
            redirect: jest.fn()
        }

        jwt.sign = jest.fn().mockReturnValue('testToken')
    })

    afterEach(() => {
        jwt.sign = originalJwtSign
    })

    test('Creates a JWT when a username is provided and redirected to /movies', async () => {
        await login(mockRequest, mockResponse)
        expect(jwt.sign).toHaveBeenCalledWith(
            {id: expect.any(Number), username: 'testUser'},
            process.env.JWT_SECRET,
            { expiresIn: '15min' }
        )
        expect(mockResponse.redirect).toHaveBeenCalledWith('/movies')
    }) 

    test('Doesnt create a JWT when no username is provided', async () => {
        mockRequest = {
            body: {}
        }
        mockResponse = {
            cookie: jest.fn(),
            redirect: jest.fn(),
            status: jest.fn(() => mockResponse),
            send: jest.fn(),
            json: jest.fn()
        }

        await login(mockRequest, mockResponse)
        expect(mockResponse.cookie).not.toHaveBeenCalled();
        expect(mockResponse.redirect).not.toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'Username is required' });
    })
})

describe('loginVerify', () => {

    test('Sets jwtIsVerified to true and request.user to the user when the JWT is correctly verified', () => {
        process.env.JWT_SECRET = 'test-secret';
        const mockUser = { id: 1, username: 'testUser' };
        const token = jwt.sign(mockUser, process.env.JWT_SECRET);
    
        const mockRequest = {
            cookies: {
                jwt: token
            }
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const mockNext = jest.fn();
    
        loginVerify(mockRequest, mockResponse, mockNext);
    
        expect(mockRequest.jwtIsVerified).toBe(true);
        expect(mockRequest.user).toEqual(expect.objectContaining(mockUser));
        expect(mockNext).toHaveBeenCalled();
    });

})