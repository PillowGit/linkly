import { supabase } from './supabase';

const safe_characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_.~';

function nDigitString(n: number): string {
	let result = '';
	for (let i = 0; i < n; i++) {
		const randomIndex = Math.floor(Math.random() * safe_characters.length);
		result += safe_characters.charAt(randomIndex);
	}
	return result;
}

async function checkIfIdExists(id: string): Promise<boolean> {
	const { data, error } = await supabase.from('redirects').select('id').eq('id', id);
	if (error) {
		throw error;
	}
	return data.length > 0;
}

async function generateNewUrl(length: number): Promise<string> {
	let result = nDigitString(length);
	try {
		while (await checkIfIdExists(result)) {
			result = nDigitString(length);
		}
	} catch (error) {
		throw error;
	}
	return result;
}

export { generateNewUrl };
