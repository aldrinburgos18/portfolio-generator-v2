const profileDataArr = process.argv.slice(2, process.argv.length);

const printProfileData = (profileDataArr) => {
  profileDataArr.forEach((profileItem) => console.log(profileItem));
};

printProfileData(profileDataArr);
