"use client";
import NavBar from "@/components/navbar/navbar";
import WalletConnect from "@/components/walletConnect/WalletConnect";
import {ProjectCard} from "@/components/projectCard/projectCard";
import Button from "@/components/button/button";
const image = "https://s3-alpha-sig.figma.com/img/9f59/ce21/c74ad96c0d1a61ac9fa97f6caef4341c?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Yei1q7fbh8SiMNZSKFg53FuoxRBPlS2JQ8FRORX17f8wO4pfP3ykn9MtSpl7HcsagUijwckyNxywwglxMPxzhq9iZ1MRHGVHA0oM~bCxbptinX7HRSPXwb8iJGC~hFnB4bvc25IHw10cR~YSstl1qWKZ-SljxordAmfXNM8TSmLY6-IUOZv1wPmZq08-4~v2WeX1dMQ4lc5M73C1vU~ClGP06djwTIeURLtkRwOjB1PGzhRbRH231XL-huIhBpsG3u2Rk3~LAzflBRMOep8wq3y-MB-S-WsG~s6zylgNVw2KvCpVXGXizUnB3LIsLLTGKyh6f5M6DXHP3~1rJ5rdKQ__"

export default function Home() {

    const handleConnectCustodialWallet = () => {
        const data = {
            "address": "0x2c7cbe8911a49aa202cf2814732b510e8f25f732",
            "companyId": "6579c1d289ad6a000767524f",
            "coin": "WLD",
            "network": "OPTIMISM",
            "ramp": "on",
            "userId": "238301",
            "fiatAmount": "30000",
            "cryptoAmount": "",
            "successRedirectUrl": "",
            "externalId": ""
        }
        fetch(
            'https://ramp-qa.manteca.dev/auth/w-signup/id',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }
        );
    }

  return (
    <>
      {/* TEMPORARY */}
      <NavBar />
      <main style={{padding: '16px'}}>
          <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
              <ProjectCard
                    image={image}
                    title="Valle de la Luna"
                    harvestType="Maiz"
                    location="Argentina, Buenos Aires"
                    endsIn="20 días"
                    requiredAmount="1.000.000"
                    raisedAmount="500.000"
              />
          </div>
          <Button onClick={handleConnectCustodialWallet}>
              Invertir por bancos
          </Button>
      </main>
    </>
  );
}
