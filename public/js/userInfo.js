async function userInfo() {
  supertokens.init({
    apiDomain: baseUrl
  });

  userId = await supertokens.getUserId();

  res = await fetch()
}

userInfo();