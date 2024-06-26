import { connect, invoke, query, registerUser } from '../fabric/network.js';
import { createModelRes } from '../utils/api-response.js';
import { generateAccessToken } from '../utils/authenticate.js';


export async function createUser(loggedUserType, information) {
    const {loggedUserId, address, name, email, password } = information;

    let networkObj;
    networkObj = await connect(loggedUserType, loggedUserId);
    if (networkObj.error) {
        return createModelRes(networkObj.status, networkObj.error);
    }

    const contractRes = await invoke(networkObj, 'createUser', name, email, loggedUserType, address, password);
    if (contractRes.error) {
        return createModelRes(contractRes.status, contractRes.error);
    }

    const walletRes = await registerUser(loggedUserType, contractRes.userId);
    if (walletRes?.error) {
        return createModelRes(walletRes.status, walletRes.error);
    }

    return createModelRes(200, 'Success', contractRes);
}

export async function signIn(loggedUserType, information) {
    const { id, password } = information;
    
    const networkObj = await connect(loggedUserType, id);
    if (networkObj.error) {
        return createModelRes(400, networkObj.error); 
    }

    let contractRes;
    contractRes = await invoke(networkObj, 'signIn', id, password);
    if (contractRes.error) {
        return createModelRes(contractRes.status, contractRes.error);
    }
    const { name, userType, role } = contractRes;

    const accessToken = generateAccessToken({ id, userType, role, name });
    return createModelRes(200, 'Success', { user : contractRes, accessToken });
}

export async function getAllUser(loggedUserType, information) {
    const { loggedUserId, userType } = information;

    const networkObj = await connect(loggedUserType, loggedUserId);
    if (networkObj.error) {
        return createModelRes(networkObj.status, networkObj.error);
    }

    const contractRes = await query(networkObj, 'queryAllUser', userType);
    if (contractRes.error) {
        return createModelRes(contractRes.status, contractRes.error);
    }

    return createModelRes(200, 'Success', contractRes);
}