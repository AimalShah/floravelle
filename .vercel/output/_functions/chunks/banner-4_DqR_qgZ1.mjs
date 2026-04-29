const bannerImg = new Proxy({"src":"/_astro/banner-4.D46LW0vs.jpeg","width":3734,"height":2800,"format":"jpg","orientation":1}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/aimal-shah/code/floravelle/src/assets/banner-4.jpeg";
							}
							
							return target[name];
						}
					});

export { bannerImg as b };
