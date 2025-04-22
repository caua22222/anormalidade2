document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const descricao = document.getElementById("descricao").value.trim();
    const local = document.getElementById("local").value.trim();
    const imagem = document.getElementById("imagem").files[0];

    if (!descricao || !local) {
      alert("❗ Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (imagem) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result;
        enviarEmail(descricao, local, base64Image);
      };
      reader.readAsDataURL(imagem);
    } else {
      enviarEmail(descricao, local, "Sem imagem");
    }
  });

  function enviarEmail(descricao, local, imagem_base64) {
    const templateParams = {
      descricao: descricao,
      local: local,
      imagem_base64: imagem_base64
    };

    emailjs.send("service_t6aku6w", "template_gpt8c23", templateParams)
      .then(() => {
        alert("✅ Anormalidade enviada com sucesso!");
        form.reset();
      })
      .catch((error) => {
        console.error("Erro ao enviar:", error);
        alert("❌ Erro ao enviar o e-mail. Verifique os dados e tente novamente.");
      });
  }
});
