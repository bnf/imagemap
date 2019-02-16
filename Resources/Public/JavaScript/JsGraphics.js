// based on http://www.walterzorn.de/en/jsgraphics/jsgraphics_e.htm
var jg_ok, jg_ie, jg_fast, jg_dom, jg_moz;

function _chkDHTM(c, a, b) {
	a = c.document.body || null;
	jg_ie = a && typeof a.insertAdjacentHTML != "undefined" && c.document.createElement;
	jg_dom = (a && !jg_ie && typeof a.appendChild != "undefined" && typeof c.document.createRange != "undefined" && typeof (b = c.document.createRange()).setStartBefore != "undefined" && typeof b.createContextualFragment != "undefined");
	jg_fast = jg_ie && c.document.all && !c.opera;
	jg_moz = jg_dom && typeof a.style.MozOpacity != "undefined";
	jg_ok = !!(jg_ie || jg_dom)
}

function _pntCnvDom() {
	var a = this.wnd.document.createRange();
	a.setStartBefore(this.cnv);
	a = a.createContextualFragment(jg_fast ? this._htmRpc() : this.htm);
	if (this.cnv) {
		this.cnv.appendChild(a)
	}
	this.htm = ""
}

function _pntCnvIe() {
	if (this.cnv) {
		this.cnv.insertAdjacentHTML("BeforeEnd", jg_fast ? this._htmRpc() : this.htm)
	}
	this.htm = ""
}

function _pntDoc() {
	this.wnd.document.write(jg_fast ? this._htmRpc() : this.htm);
	this.htm = ""
}

function _pntN() {
}

function _mkDiv(a, d, b, c) {
	this.htm += '<div style="position:absolute;left:' + a + "px;top:" + d + "px;width:" + b + "px;height:" + c + "px;clip:rect(0," + b + "px," + c + "px,0);background-color:" + this.color + (!jg_moz ? ";overflow:hidden" : "") + ';"></div>'
}

function _mkDivIe(a, d, b, c) {
	this.htm += "%%" + this.color + ";" + a + ";" + d + ";" + b + ";" + c + ";"
}

function _mkDivPrt(a, d, b, c) {
	this.htm += '<div style="position:absolute;border-left:' + b + "px solid " + this.color + ";left:" + a + "px;top:" + d + "px;width:0px;height:" + c + "px;clip:rect(0," + b + "px," + c + "px,0);background-color:" + this.color + (!jg_moz ? ";overflow:hidden" : "") + ';"></div>'
}

var _regex = /%%([^;]+);([^;]+);([^;]+);([^;]+);([^;]+);/g;

function _htmRpc() {
	return this.htm.replace(_regex, '<div style="overflow:hidden;position:absolute;background-color:$1;left:$2px;top:$3px;width:$4px;height:$5px"></div>\n')
}

function _htmPrtRpc() {
	return this.htm.replace(_regex, '<div style="overflow:hidden;position:absolute;background-color:$1;left:$2px;top:$3px;width:$4px;height:$5px;border-left:$4px solid $1"></div>\n')
}

function _mkLin(e, m, b, k) {
	if (e > b) {
		var j = b;
		var g = k;
		b = e;
		k = m;
		e = j;
		m = g
	}
	var q = b - e, o = Math.abs(k - m), l = e, i = m, n = (m > k) ? -1 : 1;
	if (q >= o) {
		var a = o << 1, h = a - (q << 1), d = a - q, f = l;
		while (q > 0) {
			--q;
			++l;
			if (d > 0) {
				this._mkDiv(f, i, l - f, 1);
				i += n;
				d += h;
				f = l
			} else {
				d += a
			}
		}
		this._mkDiv(f, i, b - f + 1, 1)
	} else {
		var a = q << 1, h = a - (o << 1), d = a - o, c = i;
		if (k <= m) {
			while (o > 0) {
				--o;
				if (d > 0) {
					this._mkDiv(l++, i, 1, c - i + 1);
					i += n;
					d += h;
					c = i
				} else {
					i += n;
					d += a
				}
			}
			this._mkDiv(b, k, 1, c - k + 1)
		} else {
			while (o > 0) {
				--o;
				i += n;
				if (d > 0) {
					this._mkDiv(l++, c, 1, i - c);
					d += h;
					c = i
				} else {
					d += a
				}
			}
			this._mkDiv(b, c, 1, k - c + 1)
		}
	}
}

function _mkLin2D(r, b, q, a) {
	if (r > q) {
		var f = q;
		var n = a;
		q = r;
		a = b;
		r = f;
		b = n
	}
	var j = q - r, i = Math.abs(a - b), h = r, g = b, m = (b > a) ? -1 : 1;
	var k = this.stroke;
	if (j >= i) {
		if (j > 0 && k - 3 > 0) {
			var t = (k * j * Math.sqrt(1 + i * i / (j * j)) - j - (k >> 1) * i) / j;
			t = (!(k - 4) ? Math.ceil(t) : Math.round(t)) + 1
		} else {
			var t = k
		}
		var u = Math.ceil(k / 2);
		var o = i << 1, e = o - (j << 1), l = o - j, d = h;
		while (j > 0) {
			--j;
			++h;
			if (l > 0) {
				this._mkDiv(d, g, h - d + u, t);
				g += m;
				l += e;
				d = h
			} else {
				l += o
			}
		}
		this._mkDiv(d, g, q - d + u + 1, t)
	} else {
		if (k - 3 > 0) {
			var t = (k * i * Math.sqrt(1 + j * j / (i * i)) - (k >> 1) * j - i) / i;
			t = (!(k - 4) ? Math.ceil(t) : Math.round(t)) + 1
		} else {
			var t = k
		}
		var u = Math.round(k / 2);
		var o = j << 1, e = o - (i << 1), l = o - i, c = g;
		if (a <= b) {
			++u;
			while (i > 0) {
				--i;
				if (l > 0) {
					this._mkDiv(h++, g, t, c - g + u);
					g += m;
					l += e;
					c = g
				} else {
					g += m;
					l += o
				}
			}
			this._mkDiv(q, a, t, c - a + u)
		} else {
			while (i > 0) {
				--i;
				g += m;
				if (l > 0) {
					this._mkDiv(h++, c, t, g - c + u);
					l += e;
					c = g
				} else {
					l += o
				}
			}
			this._mkDiv(q, c, t, a - c + u + 1)
		}
	}
}

function _mkLinDott(d, k, b, i) {
	if (d > b) {
		var h = b;
		var e = i;
		b = d;
		i = k;
		d = h;
		k = e
	}
	var o = b - d, n = Math.abs(i - k), j = d, g = k, m = (k > i) ? -1 : 1, l = true;
	if (o >= n) {
		var a = n << 1, f = a - (o << 1), c = a - o;
		while (o > 0) {
			--o;
			if (l) {
				this._mkDiv(j, g, 1, 1)
			}
			l = !l;
			if (c > 0) {
				g += m;
				c += f
			} else {
				c += a
			}
			++j
		}
	} else {
		var a = o << 1, f = a - (n << 1), c = a - n;
		while (n > 0) {
			--n;
			if (l) {
				this._mkDiv(j, g, 1, 1)
			}
			l = !l;
			g += m;
			if (c > 0) {
				++j;
				c += f
			} else {
				c += a
			}
		}
	}
	if (l) {
		this._mkDiv(j, g, 1, 1)
	}
}

function _mkOv(g, q, u, s) {
	var B = (++u) >> 1, A = (++s) >> 1, o = u & 1, f = s & 1, e = g + B, d = q + A, l = 0, k = A, j = 0, i = A,
		t = (B * B) << 1, r = t << 1, p = (A * A) << 1, n = p << 1, v = (t >> 1) * (1 - (A << 1)) + p,
		c = (p >> 1) - t * ((A << 1) - 1), m, z;
	while (k > 0) {
		if (v < 0) {
			v += p * ((l << 1) + 3);
			c += n * (++l)
		} else {
			if (c < 0) {
				v += p * ((l << 1) + 3) - r * (k - 1);
				c += n * (++l) - t * (((k--) << 1) - 3);
				m = l - j;
				z = i - k;
				if ((m & 2) && (z & 2)) {
					this._mkOvQds(e, d, l - 2, k + 2, 1, 1, o, f);
					this._mkOvQds(e, d, l - 1, k + 1, 1, 1, o, f)
				} else {
					this._mkOvQds(e, d, l - 1, i, m, z, o, f)
				}
				j = l;
				i = k
			} else {
				c -= t * ((k << 1) - 3);
				v -= r * (--k)
			}
		}
	}
	m = B - j + 1;
	z = (i << 1) + f;
	k = d - i;
	this._mkDiv(e - B, k, m, z);
	this._mkDiv(e + j + o - 1, k, m, z)
}

function _mkOv2D(g, m, c, d) {
	var L = this.stroke;
	c += L + 1;
	d += L + 1;
	var V = c >> 1, T = d >> 1, S = c & 1, E = d & 1, q = g + V, p = m + T, J = 0, G = T, B = (V * V) << 1, z = B << 1,
		k = (T * T) << 1, f = k << 1, n = (B >> 1) * (1 - (T << 1)) + k, R = (k >> 1) - B * ((T << 1) - 1);
	if (L - 4 < 0 && (!(L - 2) || c - 51 > 0 && d - 51 > 0)) {
		var u = 0, t = T, K, P, C;
		while (G > 0) {
			if (n < 0) {
				n += k * ((J << 1) + 3);
				R += f * (++J)
			} else {
				if (R < 0) {
					n += k * ((J << 1) + 3) - z * (G - 1);
					R += f * (++J) - B * (((G--) << 1) - 3);
					K = J - u;
					P = t - G;
					if (K - 1) {
						C = K + 1 + (L & 1);
						P = L
					} else {
						if (P - 1) {
							C = L;
							P += 1 + (L & 1)
						} else {
							C = P = L
						}
					}
					this._mkOvQds(q, p, J - 1, t, C, P, S, E);
					u = J;
					t = G
				} else {
					R -= B * ((G << 1) - 3);
					n -= z * (--G)
				}
			}
		}
		this._mkDiv(q - V, p - t, L, (t << 1) + E);
		this._mkDiv(q + V + S - L, p - t, L, (t << 1) + E)
	} else {
		var W = (c - (L << 1)) >> 1, U = (d - (L << 1)) >> 1, H = 0, F = U, A = (W * W) << 1, v = A << 1,
			j = (U * U) << 1, e = j << 1, o = (A >> 1) * (1 - (U << 1)) + j, Q = (j >> 1) - A * ((U << 1) - 1),
			I = new Array(), D = new Array(), M = new Array();
		I[0] = 0;
		D[0] = T;
		M[0] = U - 1;
		while (G > 0) {
			if (n < 0) {
				I[I.length] = J;
				D[D.length] = G;
				n += k * ((J << 1) + 3);
				R += f * (++J)
			} else {
				if (R < 0) {
					I[I.length] = J;
					n += k * ((J << 1) + 3) - z * (G - 1);
					R += f * (++J) - B * (((G--) << 1) - 3);
					D[D.length] = G
				} else {
					R -= B * ((G << 1) - 3);
					n -= z * (--G)
				}
			}
			if (F > 0) {
				if (o < 0) {
					o += j * ((H << 1) + 3);
					Q += e * (++H);
					M[M.length] = F - 1
				} else {
					if (Q < 0) {
						o += j * ((H << 1) + 3) - v * (F - 1);
						Q += e * (++H) - A * (((F--) << 1) - 3);
						M[M.length] = F - 1
					} else {
						Q -= A * ((F << 1) - 3);
						o -= v * (--F);
						M[M.length - 1]--
					}
				}
			}
		}
		var u = -S, t = T, r = M[0], N = I.length, K, P;
		for (var O = 0; O < N; O++) {
			if (typeof M[O] != "undefined") {
				if (M[O] < r || D[O] < t) {
					J = I[O];
					this._mkOvQds(q, p, J, t, J - u, t - r, S, E);
					u = J;
					t = D[O];
					r = M[O]
				}
			} else {
				J = I[O];
				this._mkDiv(q - J, p - t, 1, (t << 1) + E);
				this._mkDiv(q + u + S, p - t, 1, (t << 1) + E);
				u = J;
				t = D[O]
			}
		}
		this._mkDiv(q - V, p - t, 1, (t << 1) + E);
		this._mkDiv(q + u + S, p - t, 1, (t << 1) + E)
	}
}

function _mkOvDott(g, n, s, q) {
	var v = (++s) >> 1, u = (++q) >> 1, l = s & 1, f = q & 1, j = f ^ 1, e = g + v, d = n + u, i = 0, h = u,
		r = (v * v) << 1, o = r << 1, m = (u * u) << 1, k = m << 1, t = (r >> 1) * (1 - (u << 1)) + m,
		c = (m >> 1) - r * ((u << 1) - 1), p = true;
	while (h > 0) {
		if (t < 0) {
			t += m * ((i << 1) + 3);
			c += k * (++i)
		} else {
			if (c < 0) {
				t += m * ((i << 1) + 3) - o * (h - 1);
				c += k * (++i) - r * (((h--) << 1) - 3)
			} else {
				c -= r * ((h << 1) - 3);
				t -= o * (--h)
			}
		}
		if (p && h >= j) {
			this._mkOvQds(e, d, i, h, 1, 1, l, f)
		}
		p = !p
	}
}

function _mkRect(a, e, b, d) {
	var c = this.stroke;
	this._mkDiv(a, e, b, c);
	this._mkDiv(a + b, e, c, d);
	this._mkDiv(a, e + d, b + c, c);
	this._mkDiv(a, e + c, c, d - c)
}

function _mkRectDott(a, d, b, c) {
	this.drawLine(a, d, a + b, d);
	this.drawLine(a + b, d, a + b, d + c);
	this.drawLine(a, d + c, a + b, d + c);
	this.drawLine(a, d, a, d + c)
}

function jsgFont() {
	this.PLAIN = "font-weight:normal;";
	this.BOLD = "font-weight:bold;";
	this.ITALIC = "font-style:italic;";
	this.ITALIC_BOLD = this.ITALIC + this.BOLD;
	this.BOLD_ITALIC = this.ITALIC_BOLD
}

var Font = new jsgFont();

function jsgStroke() {
	this.DOTTED = -1
}

var Stroke = new jsgStroke();

function jsGraphics(a, b) {
	this.setColor = function (c) {
		this.color = c.toLowerCase()
	};
	this.setStroke = function (c) {
		this.stroke = c;
		if (!(c + 1)) {
			this.drawLine = _mkLinDott;
			this._mkOv = _mkOvDott;
			this.drawRect = _mkRectDott
		} else {
			if (c - 1 > 0) {
				this.drawLine = _mkLin2D;
				this._mkOv = _mkOv2D;
				this.drawRect = _mkRect
			} else {
				this.drawLine = _mkLin;
				this._mkOv = _mkOv;
				this.drawRect = _mkRect
			}
		}
	};
	this.setPrintable = function (c) {
		this.printable = c;
		if (jg_fast) {
			this._mkDiv = _mkDivIe;
			this._htmRpc = c ? _htmPrtRpc : _htmRpc
		} else {
			this._mkDiv = c ? _mkDivPrt : _mkDiv
		}
	};
	this.setFont = function (d, e, c) {
		this.ftFam = d;
		this.ftSz = e;
		this.ftSty = c || Font.PLAIN
	};
	this.drawPolyline = this.drawPolyLine = function (c, e) {
		for (var d = c.length - 1; d;) {
			--d;
			this.drawLine(c[d], e[d], c[d + 1], e[d + 1])
		}
	};
	this.fillRect = function (c, f, d, e) {
		this._mkDiv(c, f, d, e)
	};
	this.drawPolygon = function (c, d) {
		this.drawPolyline(c, d);
		this.drawLine(c[c.length - 1], d[c.length - 1], c[0], d[0])
	};
	this.drawEllipse = this.drawOval = function (c, f, d, e) {
		this._mkOv(c, f, d, e)
	};
	this.fillEllipse = this.fillOval = function (g, r, m, v) {
		var B = m >> 1, A = v >> 1, n = m & 1, f = v & 1, e = g + B, d = r + A, k = 0, j = A, i = A, t = (B * B) << 1,
			s = t << 1, p = (A * A) << 1, l = p << 1, u = (t >> 1) * (1 - (A << 1)) + p,
			c = (p >> 1) - t * ((A << 1) - 1), q, o, z;
		if (m) {
			while (j > 0) {
				if (u < 0) {
					u += p * ((k << 1) + 3);
					c += l * (++k)
				} else {
					if (c < 0) {
						u += p * ((k << 1) + 3) - s * (j - 1);
						q = e - k;
						o = (k << 1) + n;
						c += l * (++k) - t * (((j--) << 1) - 3);
						z = i - j;
						this._mkDiv(q, d - i, o, z);
						this._mkDiv(q, d + j + f, o, z);
						i = j
					} else {
						c -= t * ((j << 1) - 3);
						u -= s * (--j)
					}
				}
			}
		}
		this._mkDiv(e - B, d - i, m, (i << 1) + f)
	};
	this.fillArc = function (e, G, B, i, f, u) {
		var F = B >> 1, E = i >> 1, q = (B & 1) | ((i & 1) << 16), g = e + F, d = G + E, o = 0, m = E, k = o, j = m,
			v = (F * F) << 1, t = v << 1, r = (E * E) << 1, p = r << 1, z = (v >> 1) * (1 - (E << 1)) + r,
			c = (r >> 1) - v * ((E << 1) - 1), A, n, l, D,
			C = (1 << (Math.floor((f %= 360) / 180) << 3)) | (2 << (Math.floor((u %= 360) / 180) << 3)) | ((f >= u) << 16),
			h = new Array(E + 1), w = new Array(E + 1);
		f *= Math.PI / 180;
		u *= Math.PI / 180;
		A = g + Math.round(F * Math.cos(f));
		n = d + Math.round(-E * Math.sin(f));
		_mkLinVirt(h, g, d, A, n);
		l = g + Math.round(F * Math.cos(u));
		D = d + Math.round(-E * Math.sin(u));
		_mkLinVirt(w, g, d, l, D);
		while (m > 0) {
			if (z < 0) {
				z += r * ((o << 1) + 3);
				c += p * (++o)
			} else {
				if (c < 0) {
					z += r * ((o << 1) + 3) - t * (m - 1);
					k = o;
					c += p * (++o) - v * (((m--) << 1) - 3);
					this._mkArcDiv(k, m, j, g, d, q, h, w, C);
					j = m
				} else {
					c -= v * ((m << 1) - 3);
					z -= t * (--m);
					if (m && (h[m] != h[m - 1] || w[m] != w[m - 1])) {
						this._mkArcDiv(o, m, j, g, d, q, h, w, C);
						k = o;
						j = m
					}
				}
			}
		}
		this._mkArcDiv(o, 0, j, g, d, q, h, w, C);
		if (q >> 16) {
			if (C >> 16) {
				var s = (n <= d || D > d) ? (g - o) : g;
				this._mkDiv(s, d, o + g - s + (q & 65535), 1)
			} else {
				if ((C & 1) && D > d) {
					this._mkDiv(g - o, d, o, 1)
				}
			}
		}
	};
	this.fillPolygon = function (j, h) {
		var k;
		var q;
		var s, o;
		var d, r;
		var c, p;
		var m, l;
		var e;
		var f = j.length;
		if (!f) {
			return
		}
		s = h[0];
		o = h[0];
		for (k = 1; k < f; k++) {
			if (h[k] < s) {
				s = h[k]
			}
			if (h[k] > o) {
				o = h[k]
			}
		}
		for (q = s; q <= o; q++) {
			var g = new Array();
			e = 0;
			for (k = 0; k < f; k++) {
				if (!k) {
					m = f - 1;
					l = 0
				} else {
					m = k - 1;
					l = k
				}
				r = h[m];
				p = h[l];
				if (r < p) {
					d = j[m];
					c = j[l]
				} else {
					if (r > p) {
						p = h[m];
						r = h[l];
						c = j[m];
						d = j[l]
					} else {
						continue
					}
				}
				if ((q >= r) && (q < p)) {
					g[e++] = Math.round((q - r) * (c - d) / (p - r) + d)
				} else {
					if ((q == o) && (q > r) && (q <= p)) {
						g[e++] = Math.round((q - r) * (c - d) / (p - r) + d)
					}
				}
			}
			g.sort(_CompInt);
			for (k = 0; k < e; k += 2) {
				this._mkDiv(g[k], q, g[k + 1] - g[k] + 1, 1)
			}
		}
	};
	this.drawString = function (d, c, e) {
		this.htm += '<div style="position:absolute;white-space:nowrap;left:' + c + "px;top:" + e + "px;font-family:" + this.ftFam + ";font-size:" + this.ftSz + ";color:" + this.color + ";" + this.ftSty + '">' + d + "</div>"
	};
	this.drawStringRect = function (d, c, g, e, f) {
		this.htm += '<div style="position:absolute;overflow:hidden;left:' + c + "px;top:" + g + "px;width:" + e + "px;text-align:" + f + ";font-family:" + this.ftFam + ";font-size:" + this.ftSz + ";color:" + this.color + ";" + this.ftSty + '">' + d + "</div>"
	};
	this.drawImage = function (g, c, i, e, f, d) {
		this.htm += '<div style="position:absolute;left:' + c + "px;top:" + i + "px;" + (e ? ("width:" + e + "px;") : "") + (f ? ("height:" + f + "px;") : "") + '"><img src="' + g + '"' + (e ? (' width="' + e + '"') : "") + (f ? (' height="' + f + '"') : "") + (d ? (" " + d) : "") + "></div>"
	};
	this.clear = function () {
		this.htm = "";
		if (this.cnv) {
			this.cnv.innerHTML = ""
		}
	};
	this._mkOvQds = function (e, d, l, k, m, f, o, j) {
		var g = e - l, c = e + l + o - m, n = d - k, i = d + k + j - f;
		if (c > g + m) {
			this._mkDiv(c, n, m, f);
			this._mkDiv(c, i, m, f)
		} else {
			m = c - g + m
		}
		this._mkDiv(g, n, m, f);
		this._mkDiv(g, i, m, f)
	};
	this._mkArcDiv = function (p, o, d, i, g, e, m, l, r) {
		var c = i + p + (e & 65535), n, j = d - o, k, f, q;
		if (!j) {
			j = 1
		}
		p = i - p;
		if (r & 16711680) {
			n = g - o - j;
			if (r & 255) {
				if (r & 2) {
					k = Math.max(p, l[o]);
					q = c - k;
					if (q > 0) {
						this._mkDiv(k, n, q, j)
					}
				}
				if (r & 1) {
					f = Math.min(c, m[o]);
					q = f - p;
					if (q > 0) {
						this._mkDiv(p, n, q, j)
					}
				}
			} else {
				this._mkDiv(p, n, c - p, j)
			}
			n = g + o + (e >> 16);
			if (r & 65280) {
				if (r & 256) {
					k = Math.max(p, m[o]);
					q = c - k;
					if (q > 0) {
						this._mkDiv(k, n, q, j)
					}
				}
				if (r & 512) {
					f = Math.min(c, l[o]);
					q = f - p;
					if (q > 0) {
						this._mkDiv(p, n, q, j)
					}
				}
			} else {
				this._mkDiv(p, n, c - p, j)
			}
		} else {
			if (r & 255) {
				if (r & 2) {
					k = Math.max(p, l[o])
				} else {
					k = p
				}
				if (r & 1) {
					f = Math.min(c, m[o])
				} else {
					f = c
				}
				n = g - o - j;
				q = f - k;
				if (q > 0) {
					this._mkDiv(k, n, q, j)
				}
			}
			if (r & 65280) {
				if (r & 256) {
					k = Math.max(p, m[o])
				} else {
					k = p
				}
				if (r & 512) {
					f = Math.min(c, l[o])
				} else {
					f = c
				}
				n = g + o + (e >> 16);
				q = f - k;
				if (q > 0) {
					this._mkDiv(k, n, q, j)
				}
			}
		}
	};
	this.setStroke(1);
	this.setFont("verdana,geneva,helvetica,sans-serif", "12px", Font.PLAIN);
	this.color = "#000000";
	this.htm = "";
	this.wnd = b || window;
	if (!jg_ok) {
		_chkDHTM(this.wnd)
	}
	if (jg_ok) {
		if (a) {
			if (typeof (a) == "string") {
				this.cont = document.all ? (this.wnd.document.all[a] || null) : document.getElementById ? (this.wnd.document.getElementById(a) || null) : null
			} else {
				if (a == window.document) {
					this.cont = document.getElementsByTagName("body")[0]
				} else {
					this.cont = a
				}
			}
			this.cnv = this.wnd.document.createElement("div");
			this.cnv.style.fontSize = 0;
			this.cont.appendChild(this.cnv);
			this.paint = jg_dom ? _pntCnvDom : _pntCnvIe
		} else {
			this.paint = _pntDoc
		}
	} else {
		this.paint = _pntN
	}
	this.setPrintable(false)
}

function _mkLinVirt(n, e, l, c, k) {
	var r = Math.abs(c - e), q = Math.abs(k - l), m = e, j = l, a = (e > c) ? -1 : 1, o = (l > k) ? -1 : 1, d, f = 0;
	if (r >= q) {
		var b = q << 1, h = b - (r << 1);
		d = b - r;
		while (r > 0) {
			--r;
			if (d > 0) {
				n[f++] = m;
				j += o;
				d += h
			} else {
				d += b
			}
			m += a
		}
	} else {
		var b = r << 1, h = b - (q << 1);
		d = b - q;
		while (q > 0) {
			--q;
			j += o;
			n[f++] = m;
			if (d > 0) {
				m += a;
				d += h
			} else {
				d += b
			}
		}
	}
	for (var g = n.length, f = g - f; f;) {
		n[g - (f--)] = m
	}
}

function _CompInt(a, b) {
	return (a - b)
}

(function () {
	var a = false, b = /xyz/.test(function () {
		xyz
	}) ? /\b_super\b/ : /.*/;
	this.Class = function () {
	};
	Class.extend = function (g) {
		var f = this.prototype;
		a = true;
		var e = new this();
		a = false;
		for (var d in g) {
			e[d] = typeof g[d] == "function" && typeof f[d] == "function" && b.test(g[d]) ? (function (h, i) {
				return function () {
					var k = this._super;
					this._super = f[h];
					var j = i.apply(this, arguments);
					this._super = k;
					return j
				}
			})(d, g[d]) : g[d]
		}

		function c() {
			if (!a && this.init) {
				this.init.apply(this, arguments)
			}
		}

		c.prototype = e;
		c.constructor = c;
		c.extend = arguments.callee;
		return c
	}
})();
(function (a) {
	a.fn.simpleColor = function (b) {
		var c = ["990033", "ff3366", "cc0033", "ff0033", "ff9999", "cc3366", "ffccff", "cc6699", "993366", "660033", "cc3399", "ff99cc", "ff66cc", "ff99ff", "ff6699", "cc0066", "ff0066", "ff3399", "ff0099", "ff33cc", "ff00cc", "ff66ff", "ff33ff", "ff00ff", "cc0099", "990066", "cc66cc", "cc33cc", "cc99ff", "cc66ff", "cc33ff", "993399", "cc00cc", "cc00ff", "9900cc", "990099", "cc99cc", "996699", "663366", "660099", "9933cc", "660066", "9900ff", "9933ff", "9966cc", "330033", "663399", "6633cc", "6600cc", "9966ff", "330066", "6600ff", "6633ff", "ccccff", "9999ff", "9999cc", "6666cc", "6666ff", "666699", "333366", "333399", "330099", "3300cc", "3300ff", "3333ff", "3333cc", "0066ff", "0033ff", "3366ff", "3366cc", "000066", "000033", "0000ff", "000099", "0033cc", "0000cc", "336699", "0066cc", "99ccff", "6699ff", "003366", "6699cc", "006699", "3399cc", "0099cc", "66ccff", "3399ff", "003399", "0099ff", "33ccff", "00ccff", "99ffff", "66ffff", "33ffff", "00ffff", "00cccc", "009999", "669999", "99cccc", "ccffff", "33cccc", "66cccc", "339999", "336666", "006666", "003333", "00ffcc", "33ffcc", "33cc99", "00cc99", "66ffcc", "99ffcc", "00ff99", "339966", "006633", "336633", "669966", "66cc66", "99ff99", "66ff66", "339933", "99cc99", "66ff99", "33ff99", "33cc66", "00cc66", "66cc99", "009966", "009933", "33ff66", "00ff66", "ccffcc", "ccff99", "99ff66", "99ff33", "00ff33", "33ff33", "00cc33", "33cc33", "66ff33", "00ff00", "66cc33", "006600", "003300", "009900", "33ff00", "66ff00", "99ff00", "66cc00", "00cc00", "33cc00", "339900", "99cc66", "669933", "99cc33", "336600", "669900", "99cc00", "ccff66", "ccff33", "ccff00", "999900", "cccc00", "cccc33", "333300", "666600", "999933", "cccc66", "666633", "999966", "cccc99", "ffffcc", "ffff99", "ffff66", "ffff33", "ffff00", "ffcc00", "ffcc66", "ffcc33", "cc9933", "996600", "cc9900", "ff9900", "cc6600", "993300", "cc6633", "663300", "ff9966", "ff6633", "ff9933", "ff6600", "cc3300", "996633", "330000", "663333", "996666", "cc9999", "993333", "cc6666", "ffcccc", "ff3333", "cc3333", "ff6666", "660000", "990000", "cc0000", "ff0000", "ff3300", "cc9966", "ffcc99", "ffffff", "cccccc", "999999", "666666", "333333", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000"];
		b = a.extend({colors: this.attr("colors") || c, indicator: this.attr("indicator") || null}, b || {});
		a.simpleColorOptions = b;
		this.each(function (f) {
			var e = a.simpleColorOptions;
			for (var g = 0; g < e.colors.length; g++) {
				var d = a("<div class='colorPickerCell' id='" + e.colors[g] + "'/>");
				d.css("backgroundColor", "#" + e.colors[g]);
				a(this).append(d);
				var h = {color: "#" + e.colors[g]};
				d.data("parent", this).bind("click", h, function (i) {
					if (typeof i.data != "undefined") {
						a(a(this).data("parent")).trigger("click", [i.data.color])
					}
				})
			}
			a(this).append('<br style="clear:both">')
		});
		return this
	}
})(jQuery);
var canvasClass = Class.extend({
	canvasId: null,
	canvasVectors: null,
	pictureId: null,
	imageId: null,
	boxId: null,
	formsId: null,
	boxMarkerCount: null,
	areaCount: null,
	areaObjects: null,
	areaObjectList: null,
	formBlueprints: null,
	scaleFactor: 1,
	imageOrigW: null,
	imageOrigH: null,
	mouseIsDown: false,
	mouseOverCanvas: false,
	mouseCurrentObjectDrag: -1,
	mouseCurrentEdgeDrag: -1,
	mouseCurrentBorderDrag: -1,
	mouseCurrentBorderDragX: -1,
	mouseCurrentBorderDragY: -1,
	init: function (c, a, b) {
		if (c == undefined || a == undefined || b == undefined) {
			return false
		}
		this.canvasId = "#" + c;
		this.pictureId = "#" + a;
		this.formsId = "#" + b;
		this.boxMarkerCount = 0;
		this.areaCount = 0;
		this.canvasVectors = new Object();
		this.areaObjects = new Object();
		this.areaObjectList = new Array();
		this.imageOrigW = parseInt(jQuery(this.pictureId + " > #image > img").attr("width"));
		this.imageOrigH = parseInt(jQuery(this.pictureId + " > #image > img").attr("height"));
		this.formBlueprints = this.parseFormToBluePrint(this.formsId);
		jQuery(this.formsId).empty();
		this.setScale(1)
	},
	initializeScaling: function (b) {
		var a = parseInt(b) / this.imageOrigW;
		var c = parseInt(b) / this.imageOrigH;
		return (a > c) ? c : a
	},
	setScale: function (b) {
		this.scaleFactor = ((b > 1) ? 1 : b);
		jQuery(this.pictureId + " > #image > img").width(this.getMaxW());
		jQuery(this.pictureId + " > #image > img").height(this.getMaxH());
		jQuery(this.pictureId).width(this.getMaxW());
		jQuery(this.pictureId).height(this.getMaxH());
		var a = this;
		jQuery.each(this.areaObjectList, function (d, c) {
			a.areaObjects[c].setScale(a.scaleFactor);
			a.updateCanvas(c)
		});
		jQuery(this.canvasId).width(this.getMaxW()).height(this.getMaxH())
	},
	mousedown: function (c) {
		var a = c.pageX - jQuery(this.canvasId).offset().left;
		var d = c.pageY - jQuery(this.canvasId).offset().top;
		this.mouseIsDown = true;
		var b = this;
		jQuery.each(jQuery(this.formsId + " > div"), function (f, g) {
			if ((b.mouseCurrentObjectDrag == -1) && (b.mouseCurrentEdgeDrag == -1)) {
				var e = b.areaObjects[jQuery(this).attr("id")].hitOnObjectEdge(a, d, 3);
				if (e != -1) {
					b.areaObjects[jQuery(this).attr("id")].pushUndoableAction();
					b.mouseCurrentObjectDrag = jQuery(this).attr("id");
					b.mouseCurrentEdgeDrag = e;
					c.stopPropagation()
				}
			}
			if ((b.mouseCurrentObjectDrag == -1) && (b.mouseCurrentBorderDrag == -1)) {
				var e = b.areaObjects[jQuery(this).attr("id")].hitOnObjectBorder(a, d, 5);
				if (e != -1) {
					b.areaObjects[jQuery(this).attr("id")].pushUndoableAction();
					b.mouseCurrentObjectDrag = jQuery(this).attr("id");
					b.mouseCurrentBorderDrag = e;
					b.mouseCurrentBorderDragX = a;
					b.mouseCurrentBorderDragY = d;
					c.stopPropagation()
				}
			}
		});
		return false
	},
	mouseup: function (a) {
		this.mouseIsDown = false;
		this.mouseCurrentObjectDrag = -1;
		this.mouseCurrentEdgeDrag = -1;
		this.mouseCurrentBorderDrag = -1
	},
	mousemove: function (b) {
		var a = b.pageX - jQuery(this.canvasId).offset().left;
		var c = b.pageY - jQuery(this.canvasId).offset().top;
		this.mouseOverCanvas = true;
		if (a < 0) {
			a = 0;
			this.mouseOverCanvas = false
		}
		if (a > this.getMaxW()) {
			a = this.getMaxW();
			this.mouseOverCanvas = false
		}
		if (c < 0) {
			c = 0;
			this.mouseOverCanvas = false
		}
		if (c > this.getMaxH()) {
			c = this.getMaxH();
			this.mouseOverCanvas = false
		}
		if ((this.mouseCurrentObjectDrag != -1) && (this.mouseCurrentEdgeDrag != -1)) {
			this.mouseCurrentEdgeDrag = this.areaObjects[this.mouseCurrentObjectDrag].performResizeAction(this.mouseCurrentEdgeDrag, a, c);
			this.updateCanvas(this.mouseCurrentObjectDrag);
			this.updateForm(this.mouseCurrentObjectDrag);
			b.stopPropagation()
		} else {
			if ((this.mouseCurrentObjectDrag != -1) && (this.mouseCurrentBorderDrag != -1)) {
				this.mouseCurrentBorderDrag = this.areaObjects[this.mouseCurrentObjectDrag].performDragAction(this.mouseCurrentBorderDrag, a - this.mouseCurrentBorderDragX, c - this.mouseCurrentBorderDragY);
				this.mouseCurrentBorderDragX = a;
				this.mouseCurrentBorderDragY = c;
				this.updateCanvas(this.mouseCurrentObjectDrag);
				this.updateForm(this.mouseCurrentObjectDrag);
				b.stopPropagation()
			}
		}
		return false
	},
	dblclick: function (c) {
		var a = c.pageX - jQuery(this.canvasId).offset().left;
		var d = c.pageY - jQuery(this.canvasId).offset().top;
		var b = this;
		jQuery.each(jQuery(this.formsId + " > div"), function (f, g) {
			var e = b.areaObjects[jQuery(this).attr("id")].hitOnObjectEdge(a, d, 3);
			if (e !== -1) {
				if (b.areaObjects[jQuery(this).attr("id")].edgeWasHit(e)) {
					b.updateCanvas(jQuery(this).attr("id"));
					b.updateForm(jQuery(this).attr("id"))
				}
			}

			e = b.areaObjects[jQuery(this).attr("id")].hitOnObjectBorder(a, d, 5);
			if (e !== -1) {
				if (b.areaObjects[jQuery(this).attr("id")].borderWasHit(e, a, d)) {
					b.updateCanvas(jQuery(this).attr("id"));
					b.updateForm(jQuery(this).attr("id"))
				}
			}
		})
	},
	addArea: function (g, f, c, e, d, b, a) {
		if (f === "") {
			f = g.getStartupCoords(this.getCenterCoords(), this.getDimensions())
		}
		g.init(this, this.getNextId(), f, c, e, d, a);
		g.setScale(this.scaleFactor);
		this.areaObjects[g.getId()] = g;
		this.areaObjectList.push(g.getId());
		if (b) {
			jQuery(this.formsId).prepend(g.formMarkup())
		} else {
			jQuery(this.formsId).append(g.formMarkup())
		}
		jQuery(this.formsId).data("parent", this).sortable({
			distance: 3, start: function (h) {
				jQuery("#" + jQuery(h.target).attr("id") + " > .sortbtn").css("visibility", "hidden");
				jQuery("#" + jQuery(h.target).attr("id") + " > div > .sortbtn").css("visibility", "hidden")
			}, stop: function (h) {
				jQuery(this).data("parent").updateCanvasLayerOrder();
				jQuery(this).data("parent").fixSortbtnVisibility()
			}
		});
		jQuery('#' + g.getId()).data('area', g);
		this.areaObjects[g.getId()].applyBasicAreaActions();
		this.updateForm(g.getId());
		this.addCanvasLayer(g.getId());
		this.updateCanvas(g.getId());
		this.updateCanvasLayerOrder();
		this.fixSortbtnVisibility()
	},
	openPopup: function (link, area) {
		link.blur();
		$.ajax({
			url: TYPO3.settings.ajaxUrls['imagemap_browse_link'],
			method: 'GET',
			context: area,
			data: {
				returnUrl: window.imagemap.browseLink.returnUrl,
				formName: window.imagemap.browseLink.formName,
				pid: window.imagemap.browseLink.pid,
				objectId: area.getId(),
				currentValue: area.getLink()
			}
		}).done(function (response) {
			var vHWin = window.open(response.url, '', 'height=600,width=500,status=0,menubar=0,scrollbars=1'); vHWin.focus()
		});
	},
	removeArea: function (b) {
		var a = new Array();
		jQuery.each(this.areaObjectList, function (d, c) {
			if (c != b) {
				a.push(c)
			}
		});
		this.areaObjectList = a;
		this.removeCanvasLayer(b);
		this.fixSortbtnVisibility()
	},
	areaUp: function (c) {
		var b = -1;
		var a = -1;
		jQuery.each(jQuery(this.formsId + " > div"), function (d, e) {
			if (jQuery(e).attr("id") == c) {
				a = jQuery(e).attr("id")
			}
			if (a == -1) {
				b = jQuery(e).attr("id")
			}
		});
		if (b != -1) {
			jQuery("#" + a).insertBefore("#" + b);
			this.updateCanvasLayerOrder()
		}
		this.fixSortbtnVisibility()
	},
	areaDown: function (c) {
		var b = -1;
		var a = -1;
		jQuery.each(jQuery(this.formsId + " > div"), function (d, e) {
			if ((a != -1) && (b == -1)) {
				b = jQuery(e).attr("id")
			}
			if (jQuery(e).attr("id") == c) {
				a = jQuery(e).attr("id")
			}
		});
		if (b != -1) {
			jQuery("#" + a).insertAfter("#" + b);
			this.updateCanvasLayerOrder()
		}
		this.fixSortbtnVisibility()
	},
	getCenterCoords: function () {
		return {x: (this.imageOrigW / 2), y: (this.imageOrigH / 2)}
	},
	getDimensions: function () {
		return {w: this.imageOrigW, h: this.imageOrigH}
	},
	fixSortbtnVisibility: function () {
		jQuery(this.formsId + " .sortbtn").removeClass("disabled");
		jQuery(this.formsId + " > div:first .upbtn").addClass("disabled");
		jQuery(this.formsId + " > div:last .downbtn").addClass("disabled")
	},
	persistanceXML: function () {
		var a = "";
		var b = new Array();
		var c = this;
		jQuery.each(jQuery(this.formsId + " > div"), function (d, e) {
			if (typeof c.areaObjects[jQuery(e).attr("id")] != "undefined") {
				c.areaObjects[jQuery(e).attr("id")].updateStatesFromForm();
				a = a + "\n" + c.areaObjects[jQuery(e).attr("id")].persistanceXML()
			}
		});
		return a
	},
	addCanvasLayer: function (a) {
		jQuery(this.canvasId).append('<div id="' + a + '_canvas" class="canvas"><!-- --></div>');
		this.canvasVectors[a] = new jsGraphics(a + "_canvas")
	},
	updateCanvas: function (a) {
		this.canvasVectors[a].clear();
		this.areaObjects[a].drawSelection(this.canvasVectors[a]);
		this.canvasVectors[a].paint()
	},
	removeCanvasLayer: function (a) {
		this.canvasVectors[a].clear();
		jQuery("#" + a + "_canvas").remove()
	},
	updateCanvasLayerOrder: function () {
		var b = 100;
		var a = this;
		jQuery.each(jQuery(this.formsId + " > div"), function (c, d) {
			if (typeof a.areaObjects[jQuery(d).attr("id")] != "undefined") {
				jQuery("#" + jQuery(d).attr("id") + "_canvas").css("z-index", b--)
			}
		})
	},
	updateForm: function (b) {
		var a = this.areaObjects[b].formUpdate();
		jQuery.each(a.split('";'), function (d, e) {
			var c = e.split('="');
			if (c[0]) {
				jQuery("#" + c[0]).attr("value", c[1])
			}
		})
	},
	refreshForm: function (a) {
		this.areaObjects[a].updateStatesFromForm();
		this.areaObjects[a].applyBasicAreaActions(jQuery("#" + a));
		this.updateForm(this.areaObjects[a].getId())
	},
	triggerAreaLinkUpdate: function (a) {
		console.log(this);
		console.log(a);
		this.refreshForm(a)
	},
	getNextId: function () {
		this.areaCount = this.areaCount + 1;
		return "Object" + this.areaCount
	},
	getNextMarkerPointId: function () {
		this.boxMarkerCount = this.boxMarkerCount + 1;
		return "markerPoint" + this.boxMarkerCount
	},
	getFormBlueprint: function (a) {
		return this.formBlueprints[a]
	},
	parseFormToBluePrint: function (b) {
		var a = new Array();
		jQuery(b + " > div").each(function (c) {
			if (jQuery(this).attr("class") == "noIdWrap") {
				a[this.id] = jQuery("#" + this.id).html()
			} else {
				a[this.id] = '<div class="' + this.id + " " + jQuery(this).attr("class") + '" id="MAPFORMID">' + jQuery("#" + this.id).html() + "</div>"
			}
		});
		return a
	},
	getMaxW: function () {
		return this.scaleFactor * this.imageOrigW
	},
	getMaxH: function () {
		return this.scaleFactor * this.imageOrigH
	}
});
var previewCanvasClass = Class.extend({
	canvasId: null,
	canvasVectors: null,
	areaCount: null,
	areaObjects: null,
	areaObjectList: null,
	scale: null,
	init: function (b, a) {
		this.canvasId = "#" + b;
		this.scale = a;
		this.canvasVectors = new jsGraphics(b);
		this.areaCount = 0;
		this.areaObjects = new Array();
		this.areaObjectList = new Array()
	},
	addArea: function (f, e, b, d, c, a) {
		f.init(this, this.getNextId(), e, b, d, c, {});
		f.disableEdges();
		f.setScale(this.scale);
		this.areaObjects[f.getId()] = f;
		if (a) {
			this.areaObjectList.push(f.getId())
		} else {
			this.areaObjectList.unshift(f.getId())
		}
		this.updateCanvas()
	},
	updateCanvas: function () {
		this.canvasVectors.clear();
		var a = this;
		jQuery.each(this.areaObjectList, function (c, b) {
			a.areaObjects[b].drawSelection(a.canvasVectors)
		});
		this.canvasVectors.paint()
	},
	getNextId: function () {
		this.areaCount = this.areaCount + 1;
		return "Object" + this.areaCount
	},
	getMaxW: function () {
		return jQuery(this.canvasId).width()
	},
	getMaxH: function () {
		return jQuery(this.canvasId).height()
	}
});
var areaClass = Class.extend({
	_id: -1,
	_link: -1,
	_label: "",
	_canvas: -1,
	_scale: 1,
	_edges: true,
	_undoStack: new Array(),
	_redoStack: new Array(),
	_moreOptionsInitFlag: false,
	_moreOptionsVisible: false,
	_attr: {},
	_colors: ["990033", "ff9999", "ffccff", "993366", "ff66cc", "ff0066", "ff00cc", "cc0099", "cc99ff", "ff33ff", "cc00cc", "cc99cc", "9933cc", "9966cc", "6600cc", "663366", "6633ff", "9999ff", "6666cc", "333399", "3333ff", "3366ff", "0000ff", "336699", "003366", "0099cc", "0099ff", "66ffff", "009999", "33cccc", "006666", "33cc99", "00ff99", "669966", "339933", "33cc66", "009933", "ccff99", "009900", "00ff00", "009900", "66cc00", "99cc66", "669900", "ccff00", "333300", "666633", "ffff99", "ffcc00", "996600", "993300", "990000", "ff3333", "FF0000", "ff6633", "996633", "cc9999", "cc9966", "eeeeee", "999999", "666666", "333333", "000000"],
	init: function (d, g, f, c, e, b, a) {
		this._canvas = d;
		this._id = g;
		this._attr = (typeof a == "object") ? a : {};
		this.setLabel(c);
		this.setLink(e);
		this.setColor(b);
		this.initCoords(f)
	},
	remove: function () {
		jQuery("#" + this.getFormId()).remove();
		this.getCanvas().removeArea(this.getId())
	},
	getCanvas: function () {
		return this._canvas
	},
	setLabel: function (a) {
		this._label = a
	},
	getLabel: function () {
		return this._label
	},
	setLink: function (a) {
		this._link = a
	},
	getLink: function () {
		return this._link
	},
	setScale: function (a) {
		if (a < 0 || a > 1) {
			return
		}
		this._scale = a
	},
	applyScale: function (a, b) {
		return ((b) ? this._scale : 1) * parseInt(a)
	},
	reverseScale: function (a) {
		return (1 / this._scale) * parseInt(a)
	},
	_color: -1,
	setColor: function (a) {
		this._color = ((typeof a == "string") && a.match(/^#\S{6}$/g)) ? a : ("#" + this._colors[parseInt(Math.random() * 57)])
	},
	updateColor: function (b, a) {
		this.setColor(b);
		jQuery("#" + this.getFormId() + "_main .colorPreview > div").css("backgroundColor", b);
		jQuery("#" + this.getFormId() + "_color .colorBox > div").css("backgroundColor", b);
		if (a == 1) {
			this.getCanvas().updateCanvas(this.getId())
		}
	},
	getColor: function () {
		return this._color
	},
	drawEdge: function (b, a, c) {
		if (!this._edges) {
			return
		}
		b.setColor(this.getColor());
		b.fillRect(a - 3, c - 3, 7, 7);
		b.setColor("#ffffff");
		b.fillRect(a - 2, c - 2, 5, 5)
	},
	disableEdges: function () {
		this._edges = false
	},
	applyBasicAreaActions: function () {
		this._moreOptionsInitFlag = false;
		jQuery("#" + this.getFormId() + " .positionOptions input").data("area", this).on('keyup', function (e) {
			var key = e.charCode || e.keyCode || 0;
			if (!(
				(key >= 48 && key <= 57)
				|| (key >= 96 && key <= 105)
			)) {
				return;
			}
			var a = jQuery(this).data("area");
			a.pushUndoableAction();
			a.updateCoordsFromForm()
		});
		jQuery("#" + this.getFormId() + "_del").data("area", this).click(function (a) {
			jQuery(this).data("area").remove()
		});
		jQuery("#" + this.getFormId() + " .basicOptions .expUpDown").parent().data("obj", this).data("rel", "#" + this.getFormId() + " > .moreOptions").click(function (a) {
			a.stopPropagation();
			if (!jQuery(this).data("obj").isMoreOptionsVisible()) {
				jQuery(this).data("obj").applyAdditionalAreaActions();
				jQuery(jQuery(this).data("rel")).slideDown("fast")
			} else {
				jQuery(jQuery(this).data("rel")).slideUp("fast")
			}
			jQuery(this).data("obj").toogleMoreOptionsFlag()
		});
		jQuery("#" + this.getFormId() + " .basicOptions .colorPreview > div").data("target", this).click(function (b) {
			var a = jQuery(this).data("target");
			var c = jQuery("#" + a.getFormId() + " > .basicOptions .expUpDown:visible").parent();
			jQuery(c).trigger("click")
		});
		jQuery("#" + this.getFormId() + "_link").data("obj", this).change(function (b) {
			jQuery(this).data("obj").updateStatesFromForm();
			var a = jQuery(this).data("obj");
			a.pushUndoableAction()
		});
		jQuery("#" + this.getFormId() + "_label").data("obj", this).change(function (b) {
			jQuery(this).data("obj").updateStatesFromForm();
			var a = jQuery(this).data("obj");
			a.pushUndoableAction()
		});
		jQuery("#" + this.getFormId() + "_up").data("obj", this).click(function (a) {
			if ($(this).hasClass('disabled')) {
				return;
			}
			jQuery(this).data("obj").getCanvas().areaUp(jQuery(this).data("obj").getId())
		});
		jQuery("#" + this.getFormId() + "_down").data("obj", this).click(function (a) {
			if ($(this).hasClass('disabled')) {
				return;
			}
			jQuery(this).data("obj").getCanvas().areaDown(jQuery(this).data("obj").getId())
		});
		jQuery("#" + this.getFormId() + "_undo").data("obj", this).click(function (a) {
			if ($(this).hasClass('disabled')) {
				return;
			}
			jQuery(this).data("obj").performUndo()
		});
		jQuery("#" + this.getFormId() + "_redo").data("obj", this).click(function (a) {
			if ($(this).hasClass('disabled')) {
				return;
			}
			jQuery(this).data("obj").performRedo()
		});
		this.applyBasicTypeActions();
		if (!this._moreOptionsVisible) {
			jQuery("#" + this.getFormId() + " > .moreOptions").hide()
		} else {
			this.applyAdditionalAreaActions()
		}
		this.updateColor(this.getColor(), 0);
		this.changeUndoBtnStates();
		this.refreshExpandButtons()
	},
	updateStatesFromForm: function () {
		this.setLink(jQuery("<div/>").text(jQuery("#" + this.getFormId() + "_link").val()).html());
		this.setLabel(jQuery("<div/>").text(jQuery("#" + this.getFormId() + "_label").val()).html());
		var a = this;
		if (typeof this._attr != "object") {
			return
		}
		jQuery.each(this._attr, function (b, c) {
			a._attr[b] = jQuery("<div/>").text(jQuery("#" + a.getFormId() + "_" + b).val()).html()
		})
	},
	getCommonFormUpdateFields: function () {
		var a = this.getFormId() + '_link="' + this.getLink() + '";';
		a = a + this.getFormId() + '_label="' + this.getLabel() + '";';
		if (typeof this._attr == "object") {
			var b = this;
			jQuery.each(this._attr, function (c, d) {
				a = a + b.getFormId() + "_" + c + '="' + d + '";'
			})
		}
		this.updateColor(this.getColor(), false);
		return a
	},
	getAdditionalAttributeXML: function () {
		var b = 'alt="' + this.getLabel().replace(/"/g, "&quot;") + '" color="' + this.getColor() + '"';
		var a = this;
		if (typeof this._attr != "object") {
			return
		}
		jQuery.each(this._attr, function (c, d) {
			b = b + " " + c + '="' + a._attr[c].replace(/"/g, "&quot;") + '"'
		});
		return b
	},
	applyAdditionalAreaActions: function () {
		if (this._moreOptionsInitFlag == true) {
			return
		}
		jQuery("#" + this.getFormId() + "_color > .colorPicker").data("area", this).simpleColor({colors: this._colors}).click(function (b, c) {
			if (typeof c == "undefined") {
				return
			}
			var a = jQuery(this).data("area");
			a.pushUndoableAction();
			a.updateColor(c, 1)
		});
		this.applyAdditionalTypeActions();
		this._moreOptionsInitFlag = true
	},
	refreshExpandButtons: function () {
		jQuery("#" + this.getFormId() + " .expUpDown").hide();
		if (this.isMoreOptionsVisible()) {
			jQuery("#" + this.getFormId() + " .up").show()
		} else {
			jQuery("#" + this.getFormId() + " .down").show()
		}
	},
	toogleMoreOptionsFlag: function () {
		this._moreOptionsVisible = !this._moreOptionsVisible;
		this.refreshExpandButtons()
	},
	isMoreOptionsVisible: function () {
		return this._moreOptionsVisible
	},
	getId: function () {
		return this._id
	},
	getFormId: function () {
		return this.getId()
	},
	performResizeAction: function (b, a, c) {
	},
	hitOnObjectEdge: function (a, c, b) {
		return -1
	},
	hitEdge: function (e, c, d, b, a) {
		return ((Math.abs(e - d) <= (a)) && (Math.abs(c - b) <= (a)))
	},
	performDragAction: function (b, a, c) {
	},
	hitOnObjectBorder: function (a, c, b) {
		return -1
	},
	hitBorder: function (c, i, a, h, f, e, l) {
		var j = (l / 2);
		var k = (c > a) ? ((f <= c + j) && (f >= a - j)) : ((f >= c - j) && (f <= a + j));
		var b = (i > h) ? ((e <= i + j) && (e >= h - j)) : ((e >= i - j) && (e <= h + j));
		if (k && b) {
			var g = (f * i + a * e + c * h - a * i - f * h - c * e) / Math.sqrt(Math.pow(a - c, 2) + Math.pow(h - i, 2));
			return (Math.abs(g) < (j)) ? true : false
		}
		return false
	},
	edgeWasHit: function (b, a, c) {
	},
	borderWasHit: function (b, a, c) {
	},
	pushUndoableAction: function () {
		this.updateStatesFromForm();
		this._undoStack.push(this.getUndoObject());
		this._redoStack.splice(0, this._redoStack.length);
		this.changeUndoBtnStates()
	},
	performUndo: function () {
		if (this._undoStack.length) {
			var a = this._undoStack.pop();
			this._redoStack.push(this.getUndoObject());
			this.restoreFromUndoOject(a);
			this.getCanvas().updateForm(this.getId());
			this.getCanvas().updateCanvas(this.getId())
		}
		this.changeUndoBtnStates()
	},
	performRedo: function () {
		if (this._redoStack.length) {
			var a = this._redoStack.pop();
			this._undoStack.push(this.getUndoObject());
			this.restoreFromUndoOject(a);
			this.getCanvas().updateForm(this.getId());
			this.getCanvas().updateCanvas(this.getId())
		}
		this.changeUndoBtnStates()
	},
	getUndoObject: function () {
		return {}
	},
	restoreFromUndoOject: function (a) {
	},
	changeUndoBtnStates: function () {
		if (this._undoStack.length) {
			jQuery("#" + this.getFormId() + "_undo").removeClass('disabled');
		} else {
			jQuery("#" + this.getFormId() + "_undo").addClass('disabled');
		}
		if (this._redoStack.length) {
			jQuery("#" + this.getFormId() + "_redo").removeClass('disabled')
		} else {
			jQuery("#" + this.getFormId() + "_redo").addClass('disabled')
		}
	}
});
var areaCircleClass = areaClass.extend({
	_coords: -1, _undoStack: new Array(), _redoStack: new Array(), initCoords: function (b) {
		if (typeof b == "undefined") {
			return
		}
		this._coords = new Array();
		var a = b.split(",");
		this.setX(a[0]);
		this.setY(a[1]);
		this.setRadius(a[2])
	}, getStartupCoords: function (d, c) {
		var a = (c.w > 200) ? 100 : (c.w / 2);
		var b = (c.h > 200) ? 100 : (c.h / 2);
		return d.x + "," + d.y + "," + ((a > b) ? b / 2 : a / 2)
	}, persistanceXML: function () {
		return '<area shape="circle" coords="' + this.getX(0) + "," + this.getY(0) + "," + this.getRadius(0) + '" ' + this.getAdditionalAttributeXML() + ">" + this.getLink() + "</area>"
	}, drawSelection: function (a) {
		a.setColor(this.getColor());
		a.setStroke(1);
		a.drawEllipse(this.getX(1) - this.getRadius(1), this.getY(1) - this.getRadius(1), 2 * this.getRadius(1), 2 * this.getRadius(1));
		this.drawEdge(a, this.getX(1), this.getY(1));
		if ((this.getX(1) - this.getRadius(1)) > 0) {
			this.drawEdge(a, this.getX(1) - this.getRadius(1), this.getY(1))
		}
		if ((this.getX(1) + this.getRadius(1)) < this.getCanvas().getMaxW()) {
			this.drawEdge(a, this.getX(1) + this.getRadius(1), this.getY(1))
		}
		if ((this.getY(1) - this.getRadius(1)) > 0) {
			this.drawEdge(a, this.getX(1), this.getY(1) - this.getRadius(1))
		}
		if ((this.getY(1) + this.getRadius(1)) < this.getCanvas().getMaxH()) {
			this.drawEdge(a, this.getX(1), this.getY(1) + this.getRadius(1))
		}
	}, formMarkup: function (a) {
		return this.getCanvas().getFormBlueprint("circForm").replace(/MAPFORMID/g, this.getFormId()).replace(/MAPAREAVALUE_URL/g, escape(this.getLink())).replace(/MAPAREAVALUE/g, this.getLink())
	}, formUpdate: function () {
		var a = this.getFormId() + '_x="' + this.getX(0) + '";' + this.getFormId() + '_y="' + this.getY(0) + '";' + this.getFormId() + '_radius="' + this.getRadius(0) + '";';
		a = a + this.getCommonFormUpdateFields();
		return a
	}, applyBasicTypeActions: function () {
	}, applyAdditionalTypeActions: function () {
	}, updateCoordsFromForm: function (a) {
		this.setX(parseInt(jQuery("#" + this.getFormId() + "_x").val()));
		this.setY(parseInt(jQuery("#" + this.getFormId() + "_y").val()));
		this.setRadius(parseInt(jQuery("#" + this.getFormId() + "_radius").val()));
		this.getCanvas().updateCanvas(this.getId())
	}, hitOnObjectEdge: function (d, c, b) {
		var a = -1;
		if (this.hitEdge(d, c, this.getX(1), this.getY(1), b)) {
			a = 0
		} else {
			if (this.hitEdge(d, c, this.getX(1) - this.getRadius(1), this.getY(1), b)) {
				a = 1
			} else {
				if (this.hitEdge(d, c, this.getX(1) + this.getRadius(1), this.getY(1), b)) {
					a = 2
				} else {
					if (this.hitEdge(d, c, this.getX(1), this.getY(1) - this.getRadius(1), b)) {
						a = 3
					} else {
						if (this.hitEdge(d, c, this.getX(1), this.getY(1) + this.getRadius(1), b)) {
							a = 4
						}
					}
				}
			}
		}
		return a
	}, performResizeAction: function (b, e, c) {
		var a = this.reverseScale(e);
		var d = this.reverseScale(c);
		if (b == 0) {
			this.setX(a);
			this.setY(d)
		} else {
			if (b == 1 || b == 2) {
				this.setRadius(this.getX(0) - a)
			} else {
				if (b == 3 || b == 4) {
					this.setRadius(this.getY(0) - d)
				}
			}
		}
		return b
	}, performDragAction: function (c, b, a) {
		this.setX(this.getX(0) + this.reverseScale(b));
		this.setY(this.getY(0) + this.reverseScale(a));
		return c
	}, hitOnObjectBorder: function (b, d, c) {
		var a = -1;
		if (this.hitBorder(this.getX(1), this.getY(1), this.getRadius(1), this.getRadius(1), b, d, c)) {
			a = 1
		}
		return a
	}, hitBorder: function (c, f, b, a, h, g, e) {
		var i = Math.sqrt(Math.pow(h - c, 2) + Math.pow(g - f, 2));
		return (Math.abs(i) < (b + (e / 2)) && Math.abs(i) > (b - (e / 2))) ? true : false
	}, getX: function (a) {
		return this.applyScale(this._coords[0], a)
	}, setX: function (a) {
		this._coords[0] = parseInt(a)
	}, getY: function (a) {
		return this.applyScale(this._coords[1], a)
	}, setY: function (a) {
		this._coords[1] = parseInt(a)
	}, getRadius: function (a) {
		return this.applyScale(this._coords[2], a)
	}, setRadius: function (a) {
		this._coords[2] = Math.abs(parseInt(a))
	}, getUndoObject: function () {
		return {
			color: this.getColor(),
			x: this.getX(false),
			y: this.getY(false),
			radius: this.getRadius(false),
			link: this.getLink(),
			label: this.getLabel()
		}
	}, restoreFromUndoOject: function (a) {
		this.setLabel(a.label);
		this.setLink(a.link);
		this.setColor(a.color);
		this.setX(a.x);
		this.setY(a.y);
		this.setRadius(a.radius)
	}
});
var areaPolyClass = areaClass.extend({
	_coords: -1, _undoStack: new Array(), _redoStack: new Array(), initCoords: function (c) {
		if (typeof c == "undefined") {
			return
		}
		this._coords = new Array();
		var b = c.split(",");
		for (var a = 0; a < b.length; a = a + 2) {
			this.addCoord(b[a], b[a + 1], false)
		}
	}, getStartupCoords: function (d, c) {
		var a = (c.w > 200) ? 100 : (c.w / 2);
		var b = (c.h > 200) ? 100 : (c.h / 2);
		return d.x + "," + (d.y - (b / 2)) + "," + (d.x - (a / 2)) + "," + (d.y + (b / 2)) + "," + (d.x + (a / 2)) + "," + (d.y + (b / 2))
	}, persistanceXML: function () {
		return '<area shape="poly" coords="' + this.joinCoords() + '" ' + this.getAdditionalAttributeXML() + ">" + this.getLink() + "</area>"
	}, drawSelection: function (c) {
		c.setStroke(1);
		for (var e = 0; e < this._coords.length; e++) {
			var b = this._coords[e].x;
			var f = this._coords[e].y;
			var a = this._coords[((e > 0) ? e : this._coords.length) - 1].x;
			var d = this._coords[((e > 0) ? e : this._coords.length) - 1].y;
			c.setColor(this.getColor());
			c.drawLine(this.applyScale(b, 1), this.applyScale(f, 1), this.applyScale(a, 1), this.applyScale(d, 1))
		}
		for (var e = 0; e < this._coords.length; e++) {
			this.drawEdge(c, this.applyScale(this._coords[e].x, 1), this.applyScale(this._coords[e].y, 1))
		}
	}, formMarkup: function (a) {
		return this.getCanvas().getFormBlueprint("polyForm").replace(/MAPFORMID/g, this.getFormId()).replace(/MAPAREAVALUE_URL/g, escape(this.getLink())).replace(/MAPAREAVALUE/g, this.getLink()).replace(/POLYCOORDS/g, this.coordMarkup())
	}, coordMarkup: function () {
		var a = "";
		var c = this.getCanvas().getFormBlueprint("polyCoords");
		for (var b = 0; b < this._coords.length; b++) {
			a = a + c.replace(/MAPFORMID/g, this.getFormId()).replace(/vN/g, b).replace(/vX/g, this._coords[b].x).replace(/vY/g, this._coords[b].y)
		}
		return a
	}, formUpdate: function () {
		var a = "";
		for (var b = 0; b < this._coords.length; b++) {
			a = a + this.getFormId() + "_x" + b + '="' + parseInt(this._coords[b].x) + '";';
			a = a + this.getFormId() + "_y" + b + '="' + parseInt(this._coords[b].y) + '";'
		}
		a = a + this.getCommonFormUpdateFields();
		return a
	}, applyBasicTypeActions: function () {
		jQuery("#" + this.getFormId() + "_add").data("obj", this).click(function (a) {
			jQuery(this).data("obj").insertNewCoordAfterPoint(-1)
		})
	}, applyAdditionalTypeActions: function () {
		jQuery("#" + this.getFormId() + "_more > .positionOptions > .addCoord").data("obj", this).click(function (a) {
			if (this.id.match(/^.*_after\d+$/)) {
				jQuery(this).data("obj").insertNewCoordAfterPoint(parseInt(this.id.replace(/^.*_after/g, "")))
			}
			if (this.id.match(/^.*_before\d+$/)) {
				jQuery(this).data("obj").insertNewCoordBeforePoint(parseInt(this.id.replace(/^.*_before/g, "")))
			}
		});
		jQuery("#" + this.getFormId() + "_more > .positionOptions > .rmCoord").data("obj", this).click(function (a) {
			jQuery(this).data("obj").removeCoord(parseInt(this.id.replace(/^.*_rm/g, "")))
		})
	}, updateCoordsFromForm: function (b) {
		for (var a = 0; a < this._coords.length; a++) {
			this._coords[a].x = parseInt(jQuery("#" + this.getFormId() + "_x" + a).val());
			this._coords[a].y = parseInt(jQuery("#" + this.getFormId() + "_y" + a).val())
		}
		this.getCanvas().updateCanvas(this.getId())
	}, hitOnObjectEdge: function (e, c, b) {
		var a = -1;
		for (var d = 0; d < this._coords.length; d++) {
			if ((a == -1) && this.hitEdge(e, c, this.applyScale(this._coords[d].x, 1), this.applyScale(this._coords[d].y, 1), b)) {
				a = d
			}
		}
		return a
	}, performResizeAction: function (b, e, c) {
		var a = this.reverseScale(e);
		var d = this.reverseScale(c);
		if (b >= 0 && b < this._coords.length) {
			this._coords[b].x = a;
			this._coords[b].y = d
		}
		return b
	}, hitOnObjectBorder: function (f, e, d) {
		var a = -1;
		for (var c = 0; c < this._coords.length; c++) {
			var b = ((c + 1) == this._coords.length) ? 0 : c + 1;
			if ((a == -1) && this.hitBorder(this.applyScale(this._coords[c].x, 1), this.applyScale(this._coords[c].y, 1), this.applyScale(this._coords[b].x, 1), this.applyScale(this._coords[b].y, 1), f, e, d)) {
				a = c
			}
		}
		return a
	}, performDragAction: function (c, b, a) {
		for (var d = 0; d < this._coords.length; d++) {
			this._coords[d].x = this._coords[d].x + this.reverseScale(b);
			this._coords[d].y = this._coords[d].y + this.reverseScale(a)
		}
		return c
	}, edgeWasHit: function (a) {
		this.removeCoord(a);
		return true
	}, borderWasHit: function (b, a, c) {
		this._coords.splice(b + 1, 0, {x: this.reverseScale(a), y: this.reverseScale(c)});
		this.getCanvas().updateCanvas(this.getId());
		this.getCanvas().refreshForm(this.getId());
		return true
	}, addCoord: function (b, a) {
		this._coords.push({x: parseInt(b), y: parseInt(a)})
	}, insertNewCoordAfterPoint: function (c) {
		var e, b, a;
		a = this._coords.length - 1;
		if (c == -1 || c >= a) {
			e = 0;
			b = a
		} else {
			e = c;
			b = c + 1
		}
		var f = (this._coords[e].x + this._coords[b].x) / 2;
		var d = (this._coords[e].y + this._coords[b].y) / 2;
		if (e == 0 && b == a) {
			this.addCoord(f, d)
		} else {
			this._coords.splice(b, 0, {x: parseInt(f), y: parseInt(d)})
		}
		this.getCanvas().updateCanvas(this.getId());
		this.getCanvas().refreshForm(this.getId())
	}, insertNewCoordBeforePoint: function (a) {
		this.insertNewCoordAfterPoint(a - 1)
	}, removeCoord: function (a) {
		if (this._coords.length > 3) {
			this._coords.splice(a, 1);
			this.getCanvas().updateCanvas(this.getId());
			this.getCanvas().refreshForm(this.getId())
		} else {
			alert("Polygone needs to have at least 3 Edges")
		}
	}, joinCoords: function () {
		var a = "";
		for (var b = 0; b < this._coords.length; b++) {
			a = a + (a.length ? "," : "") + parseInt(this._coords[b].x) + "," + parseInt(this._coords[b].y)
		}
		return a
	}, getUndoObject: function () {
		return {color: this.getColor(), coords: this.joinCoords(), link: this.getLink(), label: this.getLabel()}
	}, restoreFromUndoOject: function (a) {
		this.setLabel(a.label);
		this.setLink(a.link);
		this.setColor(a.color);
		this.initCoords(a.coords)
	}
});
var areaRectClass = areaClass.extend({
	_coords: -1, _undoStack: new Array(), _redoStack: new Array(), initCoords: function (b) {
		if (typeof b == "undefined") {
			return
		}
		this._coords = new Array();
		var a = b.split(",");
		this.setX(a[0], a[2]);
		this.setY(a[1], a[3])
	}, getStartupCoords: function (d, c) {
		var a = (c.w > 200) ? 100 : (c.w / 2);
		var b = (c.h > 200) ? 100 : (c.h / 2);
		return (d.x - (a / 2)) + "," + (d.y - (b / 2)) + "," + (d.x + (a / 2)) + "," + (d.y + (b / 2))
	}, persistanceXML: function () {
		return '<area shape="rect" coords="' + this.getLeftX(0) + "," + this.getTopY(0) + "," + this.getRightX(0) + "," + this.getBottomY(0) + '" ' + this.getAdditionalAttributeXML() + ">" + this.getLink() + "</area>"
	}, drawSelection: function (a) {
		a.setColor(this.getColor());
		a.setStroke(1);
		a.drawRect(this.getLeftX(1), this.getTopY(1), this.getWidth(1), this.getHeight(1));
		this.drawEdge(a, this.getLeftX(1), this.getTopY(1));
		this.drawEdge(a, this.getRightX(1), this.getTopY(1));
		this.drawEdge(a, this.getRightX(1), this.getBottomY(1));
		this.drawEdge(a, this.getLeftX(1), this.getBottomY(1))
	}, formMarkup: function (a) {
		return this.getCanvas().getFormBlueprint("rectForm").replace(/MAPFORMID/g, this.getFormId()).replace(/MAPAREAVALUE_URL/g, escape(this.getLink())).replace(/MAPAREAVALUE/g, this.getLink())
	}, formUpdate: function () {
		var a = this.getFormId() + '_x1="' + this.getLeftX(0) + '";' + this.getFormId() + '_y1="' + this.getTopY(0) + '";' + this.getFormId() + '_x2="' + this.getRightX(0) + '";' + this.getFormId() + '_y2="' + this.getBottomY(0) + '";';
		a = a + this.getCommonFormUpdateFields();
		return a
	}, applyBasicTypeActions: function () {
	}, applyAdditionalTypeActions: function () {
	}, updateCoordsFromForm: function (a) {
		this.setX(parseInt(jQuery("#" + this.getFormId() + "_x1").val()), parseInt(jQuery("#" + this.getFormId() + "_x2").val()));
		this.setY(parseInt(jQuery("#" + this.getFormId() + "_y1").val()), parseInt(jQuery("#" + this.getFormId() + "_y2").val()));
		this.getCanvas().updateCanvas(this.getId())
	}, hitOnObjectEdge: function (d, c, b) {
		var a = -1;
		if (this.hitEdge(d, c, this.getLeftX(1), this.getTopY(1), b)) {
			a = 0
		} else {
			if (this.hitEdge(d, c, this.getRightX(1), this.getTopY(1), b)) {
				a = 1
			} else {
				if (this.hitEdge(d, c, this.getRightX(1), this.getBottomY(1), b)) {
					a = 2
				} else {
					if (this.hitEdge(d, c, this.getLeftX(1), this.getBottomY(1), b)) {
						a = 3
					}
				}
			}
		}
		return a
	}, performResizeAction: function (b, h, g) {
		var i = this.reverseScale(h);
		var f = this.reverseScale(g);
		var d = this.getLeftX(0);
		var c = this.getTopY(0);
		var e = this.getWidth(0);
		var a = this.getHeight(0);
		if (b == 0 || b == 3) {
			e = e - (i - d)
		}
		if (b == 0 || b == 1) {
			a = a - (f - c)
		}
		if (b == 2 || b == 1) {
			e = i - d
		}
		if (b == 2 || b == 3) {
			a = f - c
		}
		if (b == 0 || b == 3) {
			d = i
		}
		if (b == 0 || b == 1) {
			c = f
		}
		if (e < 0) {
			d = d + e;
			e = -e;
			if (b == 0) {
				b = 1
			} else {
				if (b == 1) {
					b = 0
				} else {
					if (b == 2) {
						b = 3
					} else {
						if (b == 3) {
							b = 2
						}
					}
				}
			}
		}
		if (a < 0) {
			c = c + a;
			a = -a;
			if (b == 0) {
				b = 3
			} else {
				if (b == 1) {
					b = 2
				} else {
					if (b == 2) {
						b = 1
					} else {
						if (b == 3) {
							b = 0
						}
					}
				}
			}
		}
		this.setX(d, d + e);
		this.setY(c, c + a);
		return b
	}, hitOnObjectBorder: function (d, c, b) {
		var a = -1;
		if (this.hitBorder(this.getLeftX(1), this.getTopY(1), this.getRightX(1), this.getTopY(1), d, c, b)) {
			a = 1
		}
		if (this.hitBorder(this.getRightX(1), this.getTopY(1), this.getRightX(1), this.getBottomY(1), d, c, b)) {
			a = 2
		}
		if (this.hitBorder(this.getLeftX(1), this.getBottomY(1), this.getRightX(1), this.getBottomY(1), d, c, b)) {
			a = 3
		}
		if (this.hitBorder(this.getLeftX(1), this.getTopY(1), this.getLeftX(1), this.getBottomY(1), d, c, b)) {
			a = 4
		}
		return a
	}, performDragAction: function (d, c, b) {
		var a = this.getLeftX(0);
		var g = this.getTopY(0);
		var f = this.reverseScale(c);
		var e = this.reverseScale(b);
		this.setX(a + f, a + f + this.getWidth(0));
		this.setY(g + e, g + e + this.getHeight(0));
		return d
	}, getLeftX: function (a) {
		return this.applyScale(this._coords[0], a)
	}, getTopY: function (a) {
		return this.applyScale(this._coords[1], a)
	}, getRightX: function (a) {
		return this.applyScale(this._coords[2], a)
	}, getBottomY: function (a) {
		return this.applyScale(this._coords[3], a)
	}, getWidth: function (a) {
		return this.applyScale(this.getRightX(0) - this.getLeftX(0), a)
	}, getHeight: function (a) {
		return this.applyScale(this.getBottomY(0) - this.getTopY(0), a)
	}, setX: function (b, a) {
		this._coords[0] = parseInt(parseInt(b) > parseInt(a) ? a : b);
		this._coords[2] = parseInt(parseInt(b) > parseInt(a) ? b : a)
	}, setY: function (b, a) {
		this._coords[1] = parseInt(parseInt(b) > parseInt(a) ? a : b);
		this._coords[3] = parseInt(parseInt(b) > parseInt(a) ? b : a)
	}, setW: function (b) {
		var a = this.getLeftX(0);
		this.setX(a, a + b)
	}, setH: function (a) {
		var b = this.getTopY(0);
		this.setY(b, b + a)
	}, getUndoObject: function () {
		return {
			color: this.getColor(),
			x1: this._coords[0],
			x2: this._coords[2],
			y1: this._coords[1],
			y2: this._coords[3],
			link: this.getLink(),
			label: this.getLabel()
		}
	}, restoreFromUndoOject: function (a) {
		this.setLabel(a.label);
		this.setLink(a.link);
		this.setColor(a.color);
		this.setX(a.x1, a.x2);
		this.setY(a.y1, a.y2)
	}
});
