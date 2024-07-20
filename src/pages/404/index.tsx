export function Error404Page() {
  return (
    <div className="flex h-screen items-center justify-center bg-pattern bg-center bg-no-repeat">
      <div className="w-full max-w-3xl space-y-10 px-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er logo" />
          <h1 className="text-3xl text-zinc-300">Página não encontrada!</h1>

          <p className="text-sm text-zinc-500">
            <a className="text-zinc-300 underline" href="/">
              Clique aqui
            </a>{" "}
            para voltar à página principal
          </p>
        </div>
      </div>
    </div>
  );
}
