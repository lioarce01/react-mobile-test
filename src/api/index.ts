import { ILogin } from './types';

export async function login(data: ILogin): Promise<any> {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.email === "elon@mercdev.com" && data.password === "twitter") {
          resolve({ data: { avatar: "/avatar.jpeg", name: "Elon" } });
        } else {
          resolve({ error: "Incorrect email or password" });
        }
      }, 1000);
  }).catch((error) => {
    console.log(error);
  });
}
