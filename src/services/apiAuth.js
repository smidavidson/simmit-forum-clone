import supabase from './supabase';

export async function login({ email, password }) {
    let { data: sessionData, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        console.log('Error logging in apiAuth: ', error);
    }

    return sessionData;
}
