import { useEffect, useRef } from "react";
import { Animated, Dimensions, Easing, Text, View } from "react-native";
import Svg, {
  Circle,
  ClipPath,
  Defs,
  Ellipse,
  G,
  Line,
  Path,
  Polygon,
  Rect,
} from "react-native-svg";
import { useTheme } from "../../constants/useTheme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SVG_W = Math.min(SCREEN_WIDTH * 0.82, 320);
const SVG_H = SVG_W * (600 / 800);
const SCALE = SVG_W / 800;

// ─── tiny helpers ────────────────────────────────────────────────────────────

/** alternate loop: from → to → from, duration per leg, easing, optional start delay */
function useAlt(from, to, duration, easing, startDelay = 0) {
  const v = useRef(new Animated.Value(from)).current;
  useEffect(() => {
    const loop = () =>
      Animated.loop(
        Animated.sequence([
          ...(startDelay ? [Animated.delay(startDelay)] : []),
          Animated.timing(v, {
            toValue: to,
            duration,
            easing,
            useNativeDriver: true,
          }),
          Animated.timing(v, {
            toValue: from,
            duration,
            easing,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    loop();
  }, []);
  return v;
}

/** opacity blink: 0.2 → 1 → 0.2, full cycle = duration */
function useBlink(duration, startDelay = 0) {
  const v = useRef(new Animated.Value(0.2)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        ...(startDelay ? [Animated.delay(startDelay)] : []),
        Animated.timing(v, {
          toValue: 1,
          duration: duration * 0.5,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(v, {
          toValue: 0.2,
          duration: duration * 0.5,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);
  return v;
}

const EIO = Easing.inOut(Easing.sin);

// ─── component ───────────────────────────────────────────────────────────────

export default function LoadingScreen({
  message = "Loading...",
  variant = "login",
}) {
  const { colors } = useTheme();

  // ── Spaceman: float Y + slight rotate  (1s alternate) ──
  const floatY = useAlt(0, -8, 1000, EIO);
  const floatRot = useAlt(0, 1, 1000, EIO); // degrees

  // ── Planet: rock around its centre (1s alternate) ──
  const planetRot = useAlt(0, -2, 1000, EIO); // degrees

  // ── Craters: slide right / left (1s alternate) ──
  const craterBigX = useAlt(0, 3 * SCALE, 1000, EIO);
  const craterSmallX = useAlt(0, -3 * SCALE, 1000, EIO);

  // ── Big stars blink ──
  const sb1 = useBlink(2000, 0);
  const sb2 = useBlink(2400, 500);
  const sb3 = useBlink(1800, 1000);
  const sb4 = useBlink(2200, 1500);

  // ── Small stars blink ──
  const ss1 = useBlink(1500, 0);
  const ss2 = useBlink(1800, 200);
  const ss3 = useBlink(1300, 400);
  const ss4 = useBlink(2000, 600);
  const ss5 = useBlink(1600, 800);
  const ss6 = useBlink(1400, 1000);

  // ── Big circles bob up (1s alternate, staggered) ──
  const cb1 = useAlt(0, -2 * SCALE, 1000, EIO, 0);
  const cb2 = useAlt(0, -2 * SCALE, 1000, EIO, 300);
  const cb3 = useAlt(0, -2 * SCALE, 1000, EIO, 600);
  const cb4 = useAlt(0, -2 * SCALE, 1000, EIO, 900);
  const cb5 = useAlt(0, -2 * SCALE, 1000, EIO, 1200);
  const cb6 = useAlt(0, -2 * SCALE, 1000, EIO, 1500);
  const cb7 = useAlt(0, -2 * SCALE, 1000, EIO, 1800);
  const cb8 = useAlt(0, -2 * SCALE, 1000, EIO, 400);

  // ── Glass shine: translateX -68→80, rotate 0→-30, opacity flash, 10s cycle ──
  const shineX = useRef(new Animated.Value(-68 * SCALE)).current;
  const shineRot = useRef(new Animated.Value(0)).current;
  const shineOp = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const run = () => {
      shineX.setValue(-68 * SCALE);
      shineRot.setValue(0);
      shineOp.setValue(0);
      Animated.sequence([
        Animated.delay(2000),
        Animated.parallel([
          Animated.timing(shineX, {
            toValue: 80 * SCALE,
            duration: 2500,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(shineRot, {
            toValue: -30,
            duration: 2500,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(shineOp, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(shineOp, {
              toValue: 1,
              duration: 1900,
              useNativeDriver: true,
            }),
            Animated.timing(shineOp, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
          ]),
        ]),
        Animated.delay(5200),
      ]).start(run);
    };
    run();
  }, []);

  // ── Progress bar ──
  const barAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(barAnim, {
          toValue: 1,
          duration: 1400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: false,
        }),
        Animated.timing(barAnim, {
          toValue: 0,
          duration: 400,
          easing: Easing.in(Easing.quad),
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, []);
  const barWidth = barAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["4%", "90%"],
  });

  // ── Dots ──
  const d1 = useAlt(0, -6, 300, Easing.out(Easing.quad), 0);
  const d2 = useAlt(0, -6, 300, Easing.out(Easing.quad), 150);
  const d3 = useAlt(0, -6, 300, Easing.out(Easing.quad), 300);

  const stroke = colors.muted;
  const fill = colors.card;

  // planet centre in SVG coords → scaled
  const PCX = 572.859 * SCALE;
  const PCY = 108.803 * SCALE;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.bg,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      {/* ── whole spaceman floats ── */}
      <Animated.View
        style={{
          marginBottom: 28,
          transform: [
            { translateY: floatY },
            {
              rotate: floatRot.interpolate({
                inputRange: [0, 1],
                outputRange: ["0deg", "1deg"],
              }),
            },
          ],
        }}
      >
        {/* ── planet rocks (its own layer, same size as full SVG) ── */}
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: SVG_W,
            height: SVG_H,
            transform: [
              { translateX: PCX },
              { translateY: PCY },
              {
                rotate: planetRot.interpolate({
                  inputRange: [-2, 0],
                  outputRange: ["-2deg", "0deg"],
                }),
              },
              { translateX: -PCX },
              { translateY: -PCY },
            ],
          }}
        >
          <Svg width={SVG_W} height={SVG_H} viewBox="0 0 800 600">
            <Circle
              fill="none"
              stroke={stroke}
              strokeWidth="3"
              cx="572.859"
              cy="108.803"
              r="90.788"
            />
            {/* crater big slides right */}
            <Animated.View
              style={{
                position: "absolute",
                transform: [{ translateX: craterBigX }],
              }}
            >
              <Svg
                width={SVG_W}
                height={SVG_H}
                viewBox="0 0 800 600"
                style={{ position: "absolute" }}
              >
                <Circle
                  fill="none"
                  stroke={stroke}
                  strokeWidth="3"
                  cx="548.891"
                  cy="62.319"
                  r="13.074"
                />
              </Svg>
            </Animated.View>
            {/* crater small slides left */}
            <Animated.View
              style={{
                position: "absolute",
                transform: [{ translateX: craterSmallX }],
              }}
            >
              <Svg
                width={SVG_W}
                height={SVG_H}
                viewBox="0 0 800 600"
                style={{ position: "absolute" }}
              >
                <Circle
                  fill="none"
                  stroke={stroke}
                  strokeWidth="3"
                  cx="591.743"
                  cy="158.918"
                  r="7.989"
                />
              </Svg>
            </Animated.View>
            <Path
              fill="none"
              stroke={stroke}
              strokeWidth="3"
              strokeLinecap="round"
              d="M476.562,101.461c-30.404,2.164-49.691,4.221-49.691,8.007c0,6.853,63.166,12.408,141.085,12.408s141.085-5.555,141.085-12.408c0-3.378-15.347-4.988-40.243-7.225"
            />
            <Path
              opacity="0.5"
              fill="none"
              stroke={stroke}
              strokeWidth="3"
              strokeLinecap="round"
              d="M483.985,127.43c23.462,1.531,52.515,2.436,83.972,2.436c36.069,0,68.978-1.19,93.922-3.149"
            />
          </Svg>
        </Animated.View>

        {/* ── stars & circles layer ── */}
        <View style={{ width: SVG_W, height: SVG_H }}>
          {/* big stars */}
          {[
            {
              op: sb1,
              x1: 518.07,
              y1: 245.375,
              x2: 518.07,
              y2: 266.581,
              lx1: 508.129,
              ly1: 255.978,
              lx2: 528.01,
              ly2: 255.978,
            },
            {
              op: sb2,
              x1: 154.55,
              y1: 231.391,
              x2: 154.55,
              y2: 252.598,
              lx1: 144.609,
              ly1: 241.995,
              lx2: 164.49,
              ly2: 241.995,
            },
            {
              op: sb3,
              x1: 320.135,
              y1: 132.746,
              x2: 320.135,
              y2: 153.952,
              lx1: 310.194,
              ly1: 143.349,
              lx2: 330.075,
              ly2: 143.349,
            },
            {
              op: sb4,
              x1: 200.67,
              y1: 483.11,
              x2: 200.67,
              y2: 504.316,
              lx1: 210.611,
              ly1: 493.713,
              lx2: 190.73,
              ly2: 493.713,
            },
          ].map(({ op, x1, y1, x2, y2, lx1, ly1, lx2, ly2 }, i) => (
            <Animated.View
              key={`sb${i}`}
              style={{
                position: "absolute",
                width: SVG_W,
                height: SVG_H,
                opacity: op,
              }}
            >
              <Svg width={SVG_W} height={SVG_H} viewBox="0 0 800 600">
                <Line
                  stroke={stroke}
                  strokeWidth="3"
                  strokeLinecap="round"
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                />
                <Line
                  stroke={stroke}
                  strokeWidth="3"
                  strokeLinecap="round"
                  x1={lx1}
                  y1={ly1}
                  x2={lx2}
                  y2={ly2}
                />
              </Svg>
            </Animated.View>
          ))}

          {/* small stars */}
          {[
            {
              op: ss1,
              x1: 432.173,
              y1: 380.52,
              x2: 432.173,
              y2: 391.83,
              lx1: 426.871,
              ly1: 386.175,
              lx2: 437.474,
              ly2: 386.175,
            },
            {
              op: ss2,
              x1: 489.555,
              y1: 299.765,
              x2: 489.555,
              y2: 308.124,
              lx1: 485.636,
              ly1: 303.945,
              lx2: 493.473,
              ly2: 303.945,
            },
            {
              op: ss3,
              x1: 231.468,
              y1: 291.009,
              x2: 231.468,
              y2: 299.369,
              lx1: 227.55,
              ly1: 295.189,
              lx2: 235.387,
              ly2: 295.189,
            },
            {
              op: ss4,
              x1: 244.032,
              y1: 547.539,
              x2: 244.032,
              y2: 555.898,
              lx1: 247.95,
              ly1: 551.719,
              lx2: 240.113,
              ly2: 551.719,
            },
            {
              op: ss5,
              x1: 186.359,
              y1: 406.967,
              x2: 186.359,
              y2: 415.326,
              lx1: 190.277,
              ly1: 411.146,
              lx2: 182.44,
              ly2: 411.146,
            },
            {
              op: ss6,
              x1: 480.296,
              y1: 406.967,
              x2: 480.296,
              y2: 415.326,
              lx1: 484.215,
              ly1: 411.146,
              lx2: 476.378,
              ly2: 411.146,
            },
          ].map(({ op, x1, y1, x2, y2, lx1, ly1, lx2, ly2 }, i) => (
            <Animated.View
              key={`ss${i}`}
              style={{
                position: "absolute",
                width: SVG_W,
                height: SVG_H,
                opacity: op,
              }}
            >
              <Svg width={SVG_W} height={SVG_H} viewBox="0 0 800 600">
                <Line
                  stroke={stroke}
                  strokeWidth="3"
                  strokeLinecap="round"
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                />
                <Line
                  stroke={stroke}
                  strokeWidth="3"
                  strokeLinecap="round"
                  x1={lx1}
                  y1={ly1}
                  x2={lx2}
                  y2={ly2}
                />
              </Svg>
            </Animated.View>
          ))}

          {/* big circles bob */}
          {[
            { t: cb1, cx: 588.977, cy: 255.978 },
            { t: cb2, cx: 450.066, cy: 320.259 },
            { t: cb3, cx: 168.303, cy: 353.753 },
            { t: cb4, cx: 429.522, cy: 201.185 },
            { t: cb5, cx: 200.67, cy: 176.313 },
            { t: cb6, cx: 133.343, cy: 477.014 },
            { t: cb7, cx: 283.521, cy: 568.033 },
            { t: cb8, cx: 413.618, cy: 482.387 },
          ].map(({ t, cx, cy }, i) => (
            <Animated.View
              key={`cb${i}`}
              style={{
                position: "absolute",
                width: SVG_W,
                height: SVG_H,
                transform: [{ translateY: t }],
              }}
            >
              <Svg width={SVG_W} height={SVG_H} viewBox="0 0 800 600">
                <Circle
                  fill="none"
                  stroke={stroke}
                  strokeWidth="3"
                  cx={cx}
                  cy={cy}
                  r="7.952"
                />
              </Svg>
            </Animated.View>
          ))}

          {/* small filled circles (static) */}
          <Svg
            width={SVG_W}
            height={SVG_H}
            viewBox="0 0 800 600"
            style={{ position: "absolute" }}
          >
            {[
              { cx: 549.879, cy: 296.402 },
              { cx: 253.29, cy: 229.24 },
              { cx: 434.824, cy: 263.931 },
              { cx: 183.708, cy: 544.176 },
              { cx: 382.515, cy: 530.923 },
              { cx: 130.693, cy: 305.608 },
              { cx: 480.296, cy: 477.014 },
            ].map(({ cx, cy }, i) => (
              <Circle key={i} fill={stroke} cx={cx} cy={cy} r="2.651" />
            ))}
          </Svg>
        </View>

        {/* ── spaceman body (static SVG, whole shape) ── */}
        <Svg
          width={SVG_W}
          height={SVG_H}
          viewBox="0 0 800 600"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <Defs>
            <ClipPath id="GlassClipL">
              <Path d="M380.857,346.164c-1.247,4.651-4.668,8.421-9.196,10.06c-9.332,3.377-26.2,7.817-42.301,3.5s-28.485-16.599-34.877-24.192c-3.101-3.684-4.177-8.66-2.93-13.311l7.453-27.798c0.756-2.82,3.181-4.868,6.088-5.13c6.755-0.61,20.546-0.608,41.785,5.087s33.181,12.591,38.725,16.498c2.387,1.682,3.461,4.668,2.705,7.488L380.857,346.164z" />
            </ClipPath>
            <ClipPath id="cordClipL">
              <Rect width="800" height="600" />
            </ClipPath>
          </Defs>
          <G clipPath="url(#cordClipL)">
            {/* cord */}
            <Path
              fill="none"
              stroke={stroke}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M273.813,410.969c0,0-54.527,39.501-115.34,38.218c-2.28-0.048-4.926-0.241-7.841-0.548c-68.038-7.178-134.288-43.963-167.33-103.87c-0.908-1.646-1.793-3.3-2.654-4.964c-18.395-35.511-37.259-83.385-32.075-118.817"
            />
            {/* torso */}
            <Path
              fill={fill}
              stroke={stroke}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M338.164,454.689l-64.726-17.353c-11.086-2.972-17.664-14.369-14.692-25.455l15.694-58.537c3.889-14.504,18.799-23.11,33.303-19.221l52.349,14.035c14.504,3.889,23.11,18.799,19.221,33.303l-15.694,58.537C360.647,451.083,349.251,457.661,338.164,454.689z"
            />
            {/* tether + hook */}
            <Line
              fill={fill}
              stroke={stroke}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              x1="323.396"
              y1="236.625"
              x2="295.285"
              y2="353.753"
            />
            <Circle
              fill={fill}
              stroke={stroke}
              strokeWidth="3"
              cx="323.666"
              cy="235.617"
              r="6.375"
            />
            {/* right arm */}
            <Path
              fill={fill}
              stroke={stroke}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M360.633,363.039c1.352,1.061,4.91,5.056,5.824,6.634l27.874,47.634c3.855,6.649,1.59,15.164-5.059,19.02l0,0c-6.649,3.855-15.164,1.59-19.02-5.059l-5.603-9.663"
            />
            <Path
              fill={fill}
              stroke={stroke}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M388.762,434.677c5.234-3.039,7.731-8.966,6.678-14.594c2.344,1.343,4.383,3.289,5.837,5.793c4.411,7.596,1.829,17.33-5.767,21.741c-7.596,4.411-17.33,1.829-21.741-5.767c-1.754-3.021-2.817-5.818-2.484-9.046C375.625,437.355,383.087,437.973,388.762,434.677z"
            />
            {/* left arm */}
            <Path
              fill={fill}
              stroke={stroke}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M301.301,347.66c-1.702,0.242-5.91,1.627-7.492,2.536l-47.965,27.301c-6.664,3.829-8.963,12.335-5.134,18.999h0c3.829,6.664,12.335,8.963,18.999,5.134l9.685-5.564"
            />
            <Path
              fill={fill}
              stroke={stroke}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M241.978,395.324c-3.012-5.25-2.209-11.631,1.518-15.977c-2.701-0.009-5.44,0.656-7.952,2.096c-7.619,4.371-10.253,14.09-5.883,21.71c4.371,7.619,14.09,10.253,21.709,5.883c3.03-1.738,5.35-3.628,6.676-6.59C252.013,404.214,245.243,401.017,241.978,395.324z"
            />
            {/* backpack */}
            <Path
              fill={fill}
              stroke={stroke}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M353.351,365.387c-7.948,1.263-16.249,0.929-24.48-1.278c-8.232-2.207-15.586-6.07-21.836-11.14c-17.004,4.207-31.269,17.289-36.128,35.411l-1.374,5.123c-7.112,26.525,8.617,53.791,35.13,60.899l0,0c26.513,7.108,53.771-8.632,60.883-35.158l1.374-5.123C371.778,395.999,365.971,377.536,353.351,365.387z"
            />
            <Path
              fill="none"
              stroke={stroke}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M269.678,394.912L269.678,394.912c26.3,20.643,59.654,29.585,93.106,25.724l2.419-0.114"
            />
            {/* right leg */}
            <Path
              fill={fill}
              stroke={stroke}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M312.957,456.734l-14.315,53.395c-1.896,7.07,2.299,14.338,9.37,16.234l0,0c7.07,1.896,14.338-2.299,16.234-9.37l17.838-66.534C333.451,455.886,323.526,457.387,312.957,456.734z"
            />
            <Line
              fill="none"
              stroke={stroke}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              x1="304.883"
              y1="486.849"
              x2="330.487"
              y2="493.713"
            />
            {/* left leg */}
            <Path
              fill={fill}
              stroke={stroke}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M296.315,452.273L282,505.667c-1.896,7.07-9.164,11.265-16.234,9.37l0,0c-7.07-1.896-11.265-9.164-9.37-16.234l17.838-66.534C278.993,441.286,286.836,447.55,296.315,452.273z"
            />
            <Line
              fill="none"
              stroke={stroke}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              x1="262.638"
              y1="475.522"
              x2="288.241"
              y2="482.387"
            />
            {/* helmet */}
            <Ellipse
              fill={fill}
              stroke={stroke}
              strokeWidth="3"
              cx="341.295"
              cy="315.211"
              rx="61.961"
              ry="60.305"
            />
            <Path
              fill="none"
              stroke={stroke}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M330.868,261.338c-7.929,1.72-15.381,5.246-21.799,10.246"
            />
            {/* visor */}
            <Path
              fill={colors.accent + "33"}
              stroke={stroke}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M380.857,346.164c-1.247,4.651-4.668,8.421-9.196,10.06c-9.332,3.377-26.2,7.817-42.301,3.5s-28.485-16.599-34.877-24.192c-3.101-3.684-4.177-8.66-2.93-13.311l7.453-27.798c0.756-2.82,3.181-4.868,6.088-5.13c6.755-0.61,20.546-0.608,41.785,5.087s33.181,12.591,38.725,16.498c2.387,1.682,3.461,4.668,2.705,7.488L380.857,346.164z"
            />
            {/* visor shine clipped — drawn via absolute Animated.View overlay below */}
          </G>
        </Svg>

        {/* ── visor shine — Animated.View over the SVG, clipped via overflow hidden on a positioned View ── */}
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: SVG_W,
            height: SVG_H,
            opacity: shineOp,
            transform: [
              { translateX: shineX },
              {
                rotate: shineRot.interpolate({
                  inputRange: [-30, 0],
                  outputRange: ["-30deg", "0deg"],
                }),
              },
            ],
          }}
        >
          <Svg width={SVG_W} height={SVG_H} viewBox="0 0 800 600">
            <Defs>
              <ClipPath id="GlassClipS">
                <Path d="M380.857,346.164c-1.247,4.651-4.668,8.421-9.196,10.06c-9.332,3.377-26.2,7.817-42.301,3.5s-28.485-16.599-34.877-24.192c-3.101-3.684-4.177-8.66-2.93-13.311l7.453-27.798c0.756-2.82,3.181-4.868,6.088-5.13c6.755-0.61,20.546-0.608,41.785,5.087s33.181,12.591,38.725,16.498c2.387,1.682,3.461,4.668,2.705,7.488L380.857,346.164z" />
              </ClipPath>
            </Defs>
            <G clipPath="url(#GlassClipS)">
              <Polygon
                fill="none"
                stroke={stroke}
                strokeWidth="3"
                points="278.436,375.599 383.003,264.076 364.393,251.618 264.807,364.928"
              />
            </G>
          </Svg>
        </Animated.View>
      </Animated.View>
      {/* end float wrapper */}

      {/* ── text ── */}
      <Text
        style={{
          fontSize: 22,
          fontWeight: "800",
          color: colors.text,
          marginBottom: 4,
        }}
      >
        {variant === "logout" ? "Signing Out" : "Loading"}
      </Text>
      <Text style={{ fontSize: 13, color: colors.muted, marginBottom: 20 }}>
        {message}
      </Text>

      {/* ── progress bar ── */}
      <View
        style={{
          width: "75%",
          height: 5,
          backgroundColor: colors.cardLight,
          borderRadius: 100,
          overflow: "hidden",
          marginBottom: 18,
        }}
      >
        <Animated.View
          style={{
            height: "100%",
            width: barWidth,
            backgroundColor: colors.accent,
            borderRadius: 100,
          }}
        />
      </View>

      {/* ── bouncing dots ── */}
      <View style={{ flexDirection: "row", gap: 8 }}>
        {[d1, d2, d3].map((d, i) => (
          <Animated.View
            key={i}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: colors.accent,
              transform: [{ translateY: d }],
            }}
          />
        ))}
      </View>
    </View>
  );
}
