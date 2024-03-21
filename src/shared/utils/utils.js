export const arraysEqual = (arr1, arr2) => {
	if (!arr1 || !arr2) return true;
	if (arr1.length !== arr2.length) return false;

	for (let i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}

	return true;
}

export const testimoniesEqual = (arr1, arr2) => {
	if (!arr1 || !arr2) return true;
	if (arr1.length !== arr2.length) return false;

	for (let i = 0; i < arr1.length; i++) {
		if (arr1[i].name !== arr2[i].name) return false;
	}

	return true;
}

export const sustainingAndReleasingEqual = (arr1, arr2) => {
	if (!arr1 || !arr2) return true;
	if (arr1.length !== arr2.length) return false;

	for (let i = 0; i < arr1.length; i++) {
		if (arr1[i].name !== arr2[i].name || arr1[i].called !== arr2[i].called) return false;
	}

	return true;
}

export const announcementsEqual = (arr1, arr2) => {
	if (!arr1 || !arr2) return true;
	if (arr1.length !== arr2.length) return false;

	for (let i = 0; i < arr1.length; i++) {
		if (arr1[i].announcement !== arr2[i].announcement) return false;
	}

	return true;
}
