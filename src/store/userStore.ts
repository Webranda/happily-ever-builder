
// A simple store to manage user data between components
// In a production app, you would use a more robust state management solution

interface UserData {
  email: string;
  partner1Name: string;
  partner2Name: string;
}

// Initial state
let userData: UserData = {
  email: '',
  partner1Name: '',
  partner2Name: '',
};

// Store methods
export const userStore = {
  // Get the current user data
  getData: (): UserData => {
    // Check if we have data in localStorage
    const storedData = localStorage.getItem('everAfterUserData');
    if (storedData) {
      userData = { ...userData, ...JSON.parse(storedData) };
    }
    return userData;
  },
  
  // Update the user data
  updateData: (data: Partial<UserData>): void => {
    userData = { ...userData, ...data };
    // Store in localStorage for persistence
    localStorage.setItem('everAfterUserData', JSON.stringify(userData));
  },
  
  // Clear user data
  clearData: (): void => {
    userData = {
      email: '',
      partner1Name: '',
      partner2Name: '',
    };
    localStorage.removeItem('everAfterUserData');
  }
};
