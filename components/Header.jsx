import { ConnectButton } from "web3uikit";
export default function Header() {
  return (
    <div className="bg-[#222222] grid grid-cols-2 pb-4">
      <div className="pl-4 text-4xl text-[#F94100] font-turrentroad mt-2">
        <h1>Time Vault</h1>
      </div>
      <div className="flex justify-end">
        <div>
          <form action="https://jackwillis.netlify.app/">
            <button
              type="submit"
              className="bg-slate-100 font-bold text-[#FF7324] rounded-2xl px-4 py-2 mt-2 hover:ring-1 hover:ring-[#FF7324] hover:ring-offset-2 hover:text-zinc-500 active:scale-90"
            >
              My Portfolio
            </button>
          </form>
        </div>
        <div className="mt-2">
          <ConnectButton moralisAuth={false} className="test" />
        </div>
      </div>
    </div>
  );
}
