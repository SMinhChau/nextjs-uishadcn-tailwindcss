import { Locale } from "../../../i18n-config";

export default async function IndexPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return (
    <div>
      <p>Current locale: {lang}</p>
      <p>This text is rendered on the server: </p>
    </div>
  );
}
