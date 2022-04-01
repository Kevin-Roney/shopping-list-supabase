/* eslint-disable no-console */
const SUPABASE_URL = 'https://mehoppuauhpwwofefpdc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1laG9wcHVhdWhwd3dvZmVmcGRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc5NzIzMzEsImV4cCI6MTk2MzU0ODMzMX0.SdElfTGiCmXLkKax2vtO9-vVw5ioXrQMRkH28fDYKY8';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function createItem(item, quantity) {
    const response = await client
        .from('shopping_list')
        .insert({ 
            item: item,
            quantity: quantity,
            is_bought: false,
            user_id: client.auth.user().id
        });
    return checkError(response);
}

export async function deleteAllItems() {
    const user = getUser();
    const response = await client
        .from('shopping_list')
        .delete()
        .match({ user_id: user.id });
    return checkError(response);
}

export async function getItems() {
    const response = await client
        .from('shopping_list')
        .select('*');
    return checkError(response);
}

export async function buyItem(id) {
    const response = await client
        .from('shopping_list')
        .update({ is_bought: true })
        .match({ id });
    return checkError(response);
}

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./shopping-list');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
