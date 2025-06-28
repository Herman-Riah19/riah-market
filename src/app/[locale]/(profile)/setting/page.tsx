import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormChangeUsername } from "../components/formChangeUsername";
import { FormChangePassword } from "../components/formChangePassword";
import { getTranslations } from "next-intl/server";

const Setting: React.FC = async () => {
  const t = await getTranslations("Profile");
  return (
    <section className="grid grid-cols-2 m-2">
      <Tabs defaultValue="account" className="w-full pt-4">
        <TabsList className="w-full flex justify-start gap-2">
          <TabsTrigger value="account">{t("Account.Title")}</TabsTrigger>
          <TabsTrigger value="password">{t("Password.Title")}</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <FormChangeUsername />
        </TabsContent>
        <TabsContent value="password">
          <FormChangePassword />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Setting;
