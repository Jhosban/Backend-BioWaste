export async function createResidence (newResidence) {
    try {
        return await newResidence.save();
    } catch (err) {
        throw new Error("Error creating residence: " + err);
    }
}

export default { createResidence };