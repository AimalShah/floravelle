const bannerImg = new Proxy({"src":"/_astro/banner.CMbH0X35.png","width":2048,"height":1536,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/aimal-shah/code/floravelle/src/assets/banner.png";
							}
							
							return target[name];
						}
					});

export { bannerImg as b };
